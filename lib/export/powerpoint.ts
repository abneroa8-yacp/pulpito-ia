import PptxGenJS from "pptxgenjs";

export async function exportToPowerPoint(
  titulo: string,
  contenido: string
) {
  const pptx = new PptxGenJS();

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Púlpito IA";
  pptx.company = "Púlpito IA";
  pptx.subject = titulo;
  pptx.title = titulo;

  // ===== Portada =====
  const portada = pptx.addSlide();

  portada.background = { color: "F8FAFC" };

  portada.addText("PÚLPITO IA", {
    x: 0.8,
    y: 0.7,
    w: 11,
    h: 0.6,
    fontSize: 28,
    bold: true,
    color: "2563EB",
  });

  portada.addText(titulo, {
    x: 0.8,
    y: 2,
    w: 11,
    h: 1,
    fontSize: 24,
    bold: true,
    color: "111827",
    align: "center",
  });

  // ===== Contenido =====

  const bloques = contenido
    .split(/\n(?=#{1,2}\s)/)
    .filter((b) => b.trim());

  bloques.forEach((bloque) => {
    const slide = pptx.addSlide();

    slide.background = { color: "FFFFFF" };

    const lineas = bloque.split("\n");

    const tituloBloque = lineas[0].replace(/^#+\s*/, "");

    slide.addText(tituloBloque, {
      x: 0.6,
      y: 0.4,
      w: 12,
      h: 0.5,
      fontSize: 22,
      bold: true,
      color: "2563EB",
    });

    const cuerpo = lineas.slice(1).join("\n").trim();

    slide.addText(cuerpo, {
      x: 0.7,
      y: 1.1,
      w: 11.5,
      h: 5.8,
      fontSize: 18,
      color: "333333",
      margin: 0.15,
      valign: "top",
      fit: "shrink",
    });
  });

  await pptx.writeFile({
    fileName: `${titulo}.pptx`,
  });
}