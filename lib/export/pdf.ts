import jsPDF from "jspdf";

export async function exportToPDF(
  titulo: string,
  contenido: string
) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const margen = 20;
  const ancho = 170;

  let y = 20;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text(titulo, margen, y);

  y += 15;

  const lineas = contenido.split("\n");

  for (const linea of lineas) {
    if (linea.trim() === "") {
      y += 5;
      continue;
    }

    if (linea.startsWith("#")) {
      y += 5;

      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);

      pdf.text(
        linea.replace(/^#+\s*/, ""),
        margen,
        y
      );

      y += 10;

      continue;
    }

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    const texto = pdf.splitTextToSize(linea, ancho);

    if (y + texto.length * 7 > 280) {
      pdf.addPage();
      y = 20;
    }

    pdf.text(texto, margen, y);

    y += texto.length * 7;
  }

  pdf.save(`${titulo}.pdf`);
}