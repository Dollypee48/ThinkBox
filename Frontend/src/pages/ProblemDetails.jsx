import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MindMap from "../components/MindMap";
import SWOTAnalysis from "../components/SWOTAnalysis";
import ExportPDF from "../components/ExportPDF";

export default function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingNotes, setSavingNotes] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "Personal",
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get("http://localhost:5000/api/problems", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const found = res.data.find((p) => p._id === id);
        if (!found) return setProblem(null);
        setProblem(found);
        setNotes(found.notes || "");
        setEditForm({
          title: found.title,
          description: found.description,
          category: found.category,
        });
      } catch (err) {
        console.error("Error loading problem:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSaveEdit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        `http://localhost:5000/api/problems/${id}/edit`,
        editForm,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setProblem(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error saving edits:", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this problem?");
    if (!confirmDelete) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.delete(`http://localhost:5000/api/problems/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate("/problems");
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.put(
        `http://localhost:5000/api/problems/${id}/notes`,
        { notes },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (err) {
      console.error("Error saving notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const updateMindMap = (updated) => {
    setProblem((prev) => ({ ...prev, mindMap: updated }));
  };

  const updateSWOT = (updated) => {
    setProblem((prev) => ({ ...prev, swot: updated }));
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!problem) return <p className="text-center py-10">Problem not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header + PDF Export */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-700">🧩 Problem Details</h1>
        <ExportPDF problem={problem} notes={notes} />
      </div>

      {/* Problem Section */}
      <div className="bg-white shadow p-6 rounded space-y-4">
        {editMode ? (
          <>
            <input
              className="w-full border p-2 rounded"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              placeholder="Edit title"
            />
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              placeholder="Edit description"
            ></textarea>
            <select
              className="w-full border p-2 rounded"
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            >
              <option>Personal</option>
              <option>Academic</option>
              <option>Business</option>
              <option>Other</option>
            </select>
            <div className="flex gap-4">
              <button
                onClick={handleSaveEdit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">{problem.title}</h2>
            <p className="text-gray-600">Category: {problem.category}</p>
            <p className="mt-2">{problem.description}</p>
            <div className="space-x-3 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Notes Section */}
      <div className="bg-white shadow p-6 rounded space-y-3">
        <h3 className="text-xl font-semibold text-purple-700">📝 Notes</h3>
        <textarea
          className="w-full border p-2 rounded h-40"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Capture key points, thoughts, or action steps..."
        />
        <button
          onClick={handleSaveNotes}
          disabled={savingNotes}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {savingNotes ? "Saving..." : "Save Notes"}
        </button>
      </div>

      {/* Mind Map Component */}
      <MindMap
        problemId={problem._id}
        existingMap={problem.mindMap}
        onUpdate={updateMindMap}
      />

      {/* SWOT Analysis Component */}
      <SWOTAnalysis
        problemId={problem._id}
        existingSWOT={problem.swot}
        onUpdate={updateSWOT}
      />
    </div>
  );
}
