import { useState } from "react";
import axios from "axios";

export default function SWOTAnalysis({ problemId, existingSWOT = {}, onUpdate }) {
  const [swot, setSwot] = useState({
    strengths: existingSWOT.strengths || [],
    weaknesses: existingSWOT.weaknesses || [],
    opportunities: existingSWOT.opportunities || [],
    threats: existingSWOT.threats || [],
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) => {
    setSwot({ ...swot, [key]: value.split(",").map((s) => s.trim()) });
  };

  const saveSWOT = async () => {
    setSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        `http://localhost:5000/api/problems/${problemId}/swot`,
        swot,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      onUpdate(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded mt-6">
      <h3 className="text-xl font-semibold mb-4">🔍 SWOT Analysis</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Strengths</label>
          <textarea
            rows="3"
            className="w-full border p-2 rounded"
            placeholder="Comma-separated (e.g. fast, affordable)"
            value={swot.strengths.join(", ")}
            onChange={(e) => handleChange("strengths", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Weaknesses</label>
          <textarea
            rows="3"
            className="w-full border p-2 rounded"
            placeholder="Comma-separated"
            value={swot.weaknesses.join(", ")}
            onChange={(e) => handleChange("weaknesses", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Opportunities</label>
          <textarea
            rows="3"
            className="w-full border p-2 rounded"
            placeholder="Comma-separated"
            value={swot.opportunities.join(", ")}
            onChange={(e) => handleChange("opportunities", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Threats</label>
          <textarea
            rows="3"
            className="w-full border p-2 rounded"
            placeholder="Comma-separated"
            value={swot.threats.join(", ")}
            onChange={(e) => handleChange("threats", e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={saveSWOT}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save SWOT"}
      </button>
    </div>
  );
}
