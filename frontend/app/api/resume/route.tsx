import { renderToBuffer } from "@react-pdf/renderer";
import { ResumePDF } from "@/components/resume/resume-pdf";

export async function GET() {
  const buffer = await renderToBuffer(<ResumePDF />);
  const pdfData = new Uint8Array(buffer);

  return new Response(pdfData, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="marcelo-retana-resume.pdf"',
    },
  });
}
