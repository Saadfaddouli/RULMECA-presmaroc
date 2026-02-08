import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion, AnimatePresence } from "framer-motion";
import { Target } from "@/data/mock";
import { useTranslation } from "react-i18next";

const MAPBOX_TOKEN =
  (import.meta.env.VITE_MAPBOX_TOKEN as string) ||
  "pk.eyJ1IjoibGF6cmFrYXBwIiwiYSI6ImNtYnduajVlNTB1eGIya3M4MHMycmhpMHQifQ.p98qwbrJCwnx4t5DZ3S2RQ";

const PIN_RED = "#E30613";
const SOURCE_ID = "targets";
const CLUSTER_LAYER_ID = "targets-clusters";
const CLUSTER_COUNT_LAYER_ID = "targets-cluster-count";
const UNCLUSTERED_HALO_ID = "targets-unclustered-halo";
const UNCLUSTERED_LAYER_ID = "targets-unclustered";

function targetsToGeoJSON(
  targets: Target[]
): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: "FeatureCollection",
    features: targets.map((t) => ({
      type: "Feature" as const,
      id: t.id,
      geometry: {
        type: "Point" as const,
        coordinates: [t.lng, t.lat],
      },
      properties: { targetId: t.id },
    })),
  };
}

interface GeoDashboardProps {
  filteredTargets: Target[];
  selectedTargetId: string | null;
  onTargetClick?: (target: Target) => void;
  onBoundsReady?: () => void;
}

const GeoDashboard = ({
  filteredTargets,
  selectedTargetId,
  onTargetClick,
  onBoundsReady,
}: GeoDashboardProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [hoveredTargetId, setHoveredTargetId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const targetsByIdRef = useRef<Map<string, Target>>(new Map());
  const { t } = useTranslation();

  targetsByIdRef.current = new Map(
    filteredTargets.map((tgt) => [tgt.id, tgt])
  );

  const getTargetById = useCallback((id: string) => targetsByIdRef.current.get(id), []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-7.5, 32.5],
      zoom: 5.5,
      pitch: 0,
      bearing: 0,
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      const m = map.current!;
      if (!m.getSource(SOURCE_ID)) {
        m.addSource(SOURCE_ID, {
          type: "geojson",
          data: targetsToGeoJSON(filteredTargets),
          cluster: true,
          clusterRadius: 60,
          clusterMaxZoom: 14,
          promoteId: "targetId",
        });
        m.addLayer({
          id: CLUSTER_LAYER_ID,
          type: "circle",
          source: SOURCE_ID,
          filter: ["has", "point_count"],
          paint: {
            "circle-color": PIN_RED,
            "circle-radius": 24,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff",
          },
        });
        m.addLayer({
          id: CLUSTER_COUNT_LAYER_ID,
          type: "symbol",
          source: SOURCE_ID,
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          paint: { "text-color": "#ffffff" },
        });
        m.addLayer({
          id: UNCLUSTERED_HALO_ID,
          type: "circle",
          source: SOURCE_ID,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": PIN_RED,
            "circle-radius": [
              "case",
              ["boolean", ["feature-state", "active"], false],
              22,
              ["boolean", ["feature-state", "hover"], false],
              18,
              0,
            ],
            "circle-opacity": [
              "case",
              ["boolean", ["feature-state", "active"], false],
              0.25,
              ["boolean", ["feature-state", "hover"], false],
              0.2,
              0,
            ],
            "circle-stroke-width": 0,
          },
        });
        m.addLayer({
          id: UNCLUSTERED_LAYER_ID,
          type: "circle",
          source: SOURCE_ID,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": PIN_RED,
            "circle-radius": [
              "case",
              ["boolean", ["feature-state", "active"], false],
              16,
              ["boolean", ["feature-state", "hover"], false],
              14,
              10,
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff",
          },
        });
      }
      onBoundsReady?.();
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const source = m.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
    if (source) source.setData(targetsToGeoJSON(filteredTargets));

    if (filteredTargets.length > 0 && m.isStyleLoaded()) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredTargets.forEach((tgt) => bounds.extend([tgt.lng, tgt.lat]));
      m.fitBounds(bounds, {
        padding: { top: 48, bottom: 48, left: 48, right: 48 },
        maxZoom: 7,
        duration: 800,
      });
    }
  }, [filteredTargets]);

  useEffect(() => {
    const m = map.current;
    if (!m || !m.isStyleLoaded()) return;
    try {
      filteredTargets.forEach((tgt) => {
        m.setFeatureState(
          { source: SOURCE_ID, id: tgt.id },
          {
            active: tgt.id === selectedTargetId,
            hover: tgt.id === hoveredTargetId,
          }
        );
      });
    } catch {
      // ignore when source not ready
    }
  }, [filteredTargets, selectedTargetId, hoveredTargetId]);

  useEffect(() => {
    if (!selectedTargetId) return;
    const target = getTargetById(selectedTargetId);
    if (!target || !map.current?.isStyleLoaded()) return;
    map.current.flyTo({
      center: [target.lng, target.lat],
      zoom: Math.max(map.current.getZoom() ?? 6, 10),
      duration: 600,
      essential: true,
    });
  }, [selectedTargetId, getTargetById]);

  useEffect(() => {
    const m = map.current;
    if (!m) return;

    const clearHover = (id: string | null) => {
      if (id) {
        try {
          m.setFeatureState({ source: SOURCE_ID, id }, { hover: false });
        } catch {
          // ignore
        }
      }
      setHoveredTargetId(null);
      setTooltipPos(null);
      m.getCanvas().style.cursor = "";
    };

    const onMouseMove = (e: mapboxgl.MapMouseEvent) => {
      const features = m.queryRenderedFeatures(e.point, {
        layers: [UNCLUSTERED_LAYER_ID, CLUSTER_LAYER_ID],
      });
      if (features.length === 0) {
        clearHover(hoveredTargetId);
        return;
      }
      m.getCanvas().style.cursor = "pointer";
      const f = features[0];
      const props = f.properties as { targetId?: string; point_count?: number };
      if (props.targetId) {
        const prevId = hoveredTargetId;
        if (prevId && prevId !== props.targetId) {
          try {
            m.setFeatureState({ source: SOURCE_ID, id: prevId }, { hover: false });
          } catch {
            // ignore
          }
        }
        setHoveredTargetId(props.targetId);
        try {
          m.setFeatureState({ source: SOURCE_ID, id: props.targetId }, { hover: true });
        } catch {
          // ignore
        }
        setTooltipPos({ x: e.point.x, y: e.point.y });
      } else {
        clearHover(hoveredTargetId);
        setTooltipPos({ x: e.point.x, y: e.point.y });
      }
    };

    const onMouseLeave = () => clearHover(hoveredTargetId);

    const onClick = (e: mapboxgl.MapMouseEvent) => {
      const features = m.queryRenderedFeatures(e.point, {
        layers: [UNCLUSTERED_LAYER_ID, CLUSTER_LAYER_ID],
      });
      if (features.length === 0) return;
      const f = features[0];
      const props = f.properties as { targetId?: string; cluster_id?: number };
      if (props.targetId) {
        const target = getTargetById(props.targetId);
        if (target) onTargetClick?.(target);
      } else if (props.cluster_id !== undefined) {
        const source = m.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource & {
          getClusterExpansionZoom?(
            id: number,
            cb: (err: Error | null, zoom?: number) => void
          ): void;
        };
        const clusterId = props.cluster_id;
        if (source?.getClusterExpansionZoom) {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (!err && zoom !== undefined) {
              const geometry = f.geometry as GeoJSON.Point;
              const coords = geometry.coordinates.slice() as [number, number];
              m.easeTo({ center: coords, zoom, duration: 500 });
            }
          });
        } else {
          const geometry = f.geometry as GeoJSON.Point;
          const coords = geometry.coordinates.slice() as [number, number];
          m.easeTo({
            center: coords,
            zoom: (m.getZoom() ?? 5) + 1,
            duration: 500,
          });
        }
      }
    };

    m.on("mousemove", onMouseMove);
    m.on("mouseleave", onMouseLeave);
    m.on("click", onClick);
    return () => {
      m.off("mousemove", onMouseMove);
      m.off("mouseleave", onMouseLeave);
      m.off("click", onClick);
    };
  }, [getTargetById, onTargetClick, hoveredTargetId]);

  const hoveredTarget = hoveredTargetId
    ? getTargetById(hoveredTargetId)
    : null;
  const statusKey = hoveredTarget?.status
    ? (`geo.status.${hoveredTarget.status}` as const)
    : null;
  const statusLabel = statusKey ? t(statusKey) : "";

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-r-none overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

      <AnimatePresence>
        {tooltipPos && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-10 rounded-xl bg-[hsl(var(--rulmeca-ink))] text-white px-3 py-2 shadow-lg text-left max-w-[220px] border border-white/10"
            style={{
              left: tooltipPos.x + 12,
              top: tooltipPos.y + 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {hoveredTarget ? (
              <>
                <div className="font-semibold text-sm">{hoveredTarget.name}</div>
                <div className="text-xs text-white/80 mt-0.5">
                  {hoveredTarget.city} · {hoveredTarget.segment}
                </div>
                {statusLabel && (
                  <div className="text-xs text-white/70 mt-1">{statusLabel}</div>
                )}
              </>
            ) : (
              <span className="text-sm">Plusieurs sites</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeoDashboard;
