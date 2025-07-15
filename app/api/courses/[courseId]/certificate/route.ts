// /app/api/courses/[courseId]/certificate/route.ts

import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { name } = await req.json();

  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const course = await db.course.findUnique({
    where: { id: params.courseId },
    select: { title: true },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const courseTitle = course.title;
  const filePath = path.resolve("./public/assets/certificate-template.pdf");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "Certificate template not found" },
      { status: 500 }
    );
  }

  const existingPdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPages()[0];
  const { width } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const normalFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const nameSize = 22;
  const courseSize = 16;

  // Inject Full Name
  page.drawText(name, {
    x: width / 2 - font.widthOfTextAtSize(name, nameSize) / 2,
    y: 300,
    size: 28,
    font,
    color: rgb(0, 0, 0),
  });

  // Inject Course Title
  page.drawText(courseTitle, {
    x: width / 2 - normalFont.widthOfTextAtSize(courseTitle, courseSize) / 2,
    y: 240,
    size: courseSize,
    font: normalFont,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Inject Date
  const date = new Date().toLocaleDateString("en-IN");
  page.drawText(date, {
    x: width / 2 - normalFont.widthOfTextAtSize(date, 12) / 2 + 7,
    y: 77,
    size: 15,
    font: normalFont,
    color: rgb(0.4, 0.4, 0.4),
  });

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${name}-certificate.pdf"`,
    },
  });
}
