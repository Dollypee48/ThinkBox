import html2pdf from "html2pdf.js";
import { useRef } from "react";

export default function ExportPDF({ problem, notes }) {
  const pdfRef = useRef();

  const exportToPDF = () => {
    const element = pdfRef.current;
    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: `${problem.title || "ThinkBox_Report"}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  };

  return (
    <div className="mb-6">
      <button
        onClick={exportToPDF}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Export to PDF
      </button>

      {/* Hidden exportable content */}
      <div ref={pdfRef} className="bg-white p-4 rounded shadow space-y-6 mt-6 hidden">
        <section>
          <h2 className="text-xl font-semibold">📝 Title & Description</h2>
          <p><strong>Title:</strong> {problem.title}</p>
          <p><strong>Category:</strong> {problem.category}</p>
          <p><strong>Description:</strong> {problem.description}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">✍️ Notes</h2>
          <p className="whitespace-pre-wrap">{notes}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">🌳 Mind Map</h2>
          <ul className="ml-4 list-disc text-sm">
            {problem.mindMap?.map((node) => (
              <li key={node.id}>
                {node.label} {node.parentId && `(Child of ${node.parentId})`}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">🔍 SWOT Analysis</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Strengths:</strong>
              <ul className="ml-4 list-disc">
                {problem.swot?.strengths?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <strong>Weaknesses:</strong>
              <ul className="ml-4 list-disc">
                {problem.swot?.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
            <div>
              <strong>Opportunities:</strong>
              <ul className="ml-4 list-disc">
                {problem.swot?.opportunities?.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
            <div>
              <strong>Threats:</strong>
              <ul className="ml-4 list-disc">
                {problem.swot?.threats?.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
