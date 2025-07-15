// /app/api/courses/[courseId]/certificate/route.ts
import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  const { name } = await req.json();

  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  // Load the certificate template
  const filePath = path.resolve("./public/assets/certificate-template.pdf");
  const existingPdfBytes = fs.readFileSync(filePath);

  // Load the PDF and add text
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 18;
  const centerX = width / 2;

  // Inject Name
  page.drawText(name, {
    x: centerX - font.widthOfTextAtSize(name, fontSize) / 2,
    y: height / 2 + 20,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Inject Course Title
  const courseTitle = "Course Title Placeholder"; // Replace with DB lookup if needed
  page.drawText(courseTitle, {
    x: centerX - font.widthOfTextAtSize(courseTitle, fontSize - 2) / 2,
    y: height / 2 - 10,
    size: fontSize - 2,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Inject Date
  const date = new Date().toLocaleDateString("en-IN");
  page.drawText(date, {
    x: centerX - 30,
    y: 80,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });

  // Finalize PDF
  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${name}-certificate.pdf"`,
    },
  });
}
