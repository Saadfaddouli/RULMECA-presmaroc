import "./portefeuille-codepen.css";

import img1 from "@/assets/RULMECAASSETS/Nouveau dossier/1000H_HD_960x800.jpg.jpeg";
import img2 from "@/assets/RULMECAASSETS/Nouveau dossier/220H_960x800.jpg.jpeg";
import img3 from "@/assets/RULMECAASSETS/Nouveau dossier/400H_960x800.jpg.jpeg";
import img4 from "@/assets/RULMECAASSETS/Nouveau dossier/630H_960x800.jpg.jpeg";
import img5 from "@/assets/RULMECAASSETS/Nouveau dossier/800H_960x800.jpg.jpeg";
import img6 from "@/assets/RULMECAASSETS/Nouveau dossier/CantileveredSets_960x800.jpg.jpeg";
import img7 from "@/assets/RULMECAASSETS/Nouveau dossier/Frames_EU_Self-centering_sets_960x800.jpg.jpeg";
import img8 from "@/assets/RULMECAASSETS/Nouveau dossier/MPS-Belt_scale_rollers.jpg.jpeg";
import img9 from "@/assets/RULMECAASSETS/Nouveau dossier/PSV.jpg.jpeg";
import img10 from "@/assets/RULMECAASSETS/Nouveau dossier/Supports_960x800.jpg.jpeg";
import img11 from "@/assets/RULMECAASSETS/Nouveau dossier/T3M_960x800.jpg.jpeg";
import img12 from "@/assets/RULMECAASSETS/Nouveau dossier/Valmec_EU_960x800.jpeg";
import img13 from "@/assets/RULMECAASSETS/Nouveau dossier/138LS_960x800.jpg.jpeg";
import img14 from "@/assets/RULMECAASSETS/Nouveau dossier/500H_960x800.jpg.jpeg";
import img15 from "@/assets/RULMECAASSETS/Nouveau dossier/RULLI_FAMIGLIA_1200x630.jpg.jpeg";

const PRODUCT_IMAGES: string[] = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15,
];

const ROW_SIZE = 5;

function ProductLine({ src }: { src: string }) {
  const style = { backgroundImage: `url(${src})` };
  return (
    <div className="line" style={style}>
      <div className="img" style={style} />
    </div>
  );
}

export default function ProductImagesStrip() {
  const rows = [
    PRODUCT_IMAGES.slice(0, 5),
    PRODUCT_IMAGES.slice(5, 10),
    PRODUCT_IMAGES.slice(10, 15),
    PRODUCT_IMAGES.slice(0, 5),
    PRODUCT_IMAGES.slice(5, 10),
  ];

  return (
    <div className="portefeuille-codepen-wrap">
      <div className="wrapper-images">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="images-line">
            {[...row, ...row, ...row].map((src, i) => (
              <ProductLine key={`${rowIndex}-${i}`} src={src} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
