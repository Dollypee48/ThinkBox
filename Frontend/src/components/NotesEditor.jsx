import { useState } from "react";
import axios from "axios";

export default function NotesEditor({ problemId, initialNotes = "" }) {
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    try {
      setSaving(true);
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.put(`http://localhost:5000/api/problems/${problemId}/notes`, { notes }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setStatus("Notes saved.");
    } catch (err) {
      console.error("Error:", err);
      setStatus("Error saving notes.");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded space-y-4">
      <h3 className="text-xl font-semibold text-purple-700">Your Notes</h3>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} className="w-full border p-3 rounded" />
      <button onClick={handleSave} disabled={saving} className="bg-purple-600 text-white px-4 py-2 rounded">
        {saving ? "Saving..." : "Save Notes"}
      </button>
      {status && <p className="text-sm text-gray-500">{status}</p>}
    </div>
  );
}
