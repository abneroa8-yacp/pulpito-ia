import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from "docx";

export async function exportToWord(
  titulo: string,
  markdown: string
) {

  const lineas = markdown.split("\n");

  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [
        new TextRun({
          text: "PÚLPITO IA",
          bold: true,
          size: 40,
        }),
      ],
    })
  );

  children.push(new Paragraph(""));
for (const linea of lineas) {

  if (!linea.trim()) {
    children.push(new Paragraph(""));
    continue;
  }

  if (linea.startsWith("# ")) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [
          new TextRun({
            text: linea.replace("# ", ""),
            bold: true,
          }),
        ],
      })
    );
    continue;
  }

  if (linea.startsWith("## ")) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun(linea.replace("## ", "")),
        ],
      })
    );
    continue;
  }

  if (linea.startsWith("### ")) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun(linea.replace("### ", "")),
        ],
      })
    );
    continue;
  }
  if (linea.startsWith(">")) {
  children.push(
    new Paragraph({
      indent: {
        left: 600,
      },
      children: [
        new TextRun({
          text: linea.replace(/^>\s?/, ""),
          italics: true,
        }),
      ],
    })
  );
  continue;
}

  if (linea.startsWith("- ")) {
    children.push(
      new Paragraph({
        bullet: {
          level: 0,
        },
        children: [
          new TextRun(linea.replace("- ", "")),
        ],
      })
    );
    continue;
  }

  children.push(
    new Paragraph({
      children: [
        new TextRun(linea),
      ],
    })
  );

}

  const doc = new Document({
    sections: [
      {
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = `${titulo}.docx`;

  a.click();

  URL.revokeObjectURL(url);
}