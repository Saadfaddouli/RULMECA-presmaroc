import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { Download, Filter } from "lucide-react";
import { actions, targets } from "@/data/mock";
import { useTranslation } from "react-i18next";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const PlanningSection = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const { t } = useTranslation();

  const segments = ["all", "Mines", "Carrières", "Cimenteries"];

  const filteredActions = selectedSegment === "all"
    ? actions
    : actions.filter(a => a.segment === selectedSegment);

  const handleExport = () => {
    console.log("Export planning");
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-4 ml-[220px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-block">
            {t("planning.title")}
          </span>
          <h2 className="text-rulmeca-text mb-4">
            Calendrier d'Exécution
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendrier */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-rulmeca-border p-8"
          >
            <div className="mb-8">
              <h3 className="mb-6 text-rulmeca-text">Calendrier Mensuel</h3>
              <Calendar
                onChange={setDate}
                value={date}
                className="custom-calendar"
              />
            </div>

            {/* Filtres */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-rulmeca-muted" />
                <span className="text-sm font-medium text-rulmeca-text">
                  {t("planning.filter")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {segments.map((segment) => (
                  <button
                    key={segment}
                    onClick={() => setSelectedSegment(segment)}
                    className={`px-4 py-2 text-sm font-medium transition-all border ${
                      selectedSegment === segment
                        ? "bg-rulmeca-red text-white border-rulmeca-red"
                        : "bg-white text-rulmeca-text border-rulmeca-border hover:bg-rulmeca-alt"
                    }`}
                    style={{ borderRadius: "6px" }}
                  >
                    {segment === "all" ? "Tous" : segment}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mini Gantt */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-rulmeca-border p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-rulmeca-text">Timeline Actions</h3>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-rulmeca-red text-white px-4 py-2 text-sm font-medium hover:bg-rulmeca-deep-red transition-colors"
                style={{ borderRadius: "6px" }}
              >
                <Download className="w-4 h-4" />
                {t("planning.export")}
              </button>
            </div>

            <div className="space-y-6">
              {filteredActions.slice(0, 6).map((action, index) => (
                <div key={action.id} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-rulmeca-text mb-1">
                        {action.title}
                      </h4>
                      <p className="text-xs text-rulmeca-muted">
                        {action.city} • {action.segment}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 border ${
                        action.status === "terminé"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : action.status === "en cours"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                      style={{ borderRadius: "4px" }}
                    >
                      {action.status}
                    </span>
                  </div>
                  {/* Barre Gantt simplifiée */}
                  <div className="relative h-2 bg-rulmeca-alt border border-rulmeca-border overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(index + 1) * 15}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`h-full ${
                        action.status === "terminé"
                          ? "bg-green-500"
                          : action.status === "en cours"
                          ? "bg-blue-500"
                          : "bg-rulmeca-muted"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .custom-calendar {
          width: 100%;
          border: none;
          font-family: 'Inter', sans-serif;
        }
        .custom-calendar .react-calendar__tile {
          border-radius: 4px;
          margin: 2px;
        }
        .custom-calendar .react-calendar__tile--active {
          background: #E30613;
          color: white;
        }
        .custom-calendar .react-calendar__tile--now {
          background: #F7F8FA;
          color: #E30613;
          font-weight: 600;
        }
        .custom-calendar .react-calendar__navigation button {
          color: #1F2937;
          font-weight: 600;
        }
        .custom-calendar .react-calendar__navigation button:enabled:hover,
        .custom-calendar .react-calendar__navigation button:enabled:focus {
          background: #F7F8FA;
        }
      `}</style>
    </section>
  );
};

export default PlanningSection;
