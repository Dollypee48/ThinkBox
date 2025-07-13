import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProblem } from "../features/problems/problemSlice";
import { useNavigate } from "react-router-dom";

export default function ProblemForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, problems } = useSelector((state) => state.problems);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Personal",
  });

  const [submitted, setSubmitted] = useState(false); // 🔹 Track submission intent

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required");

    try {
      await dispatch(createProblem(form)).unwrap(); // wait for success
      setForm({ title: "", description: "", category: "Personal" });
      navigate("/problems"); // ✅ navigate on success
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">🧠 Submit a Problem</h2>
        <p className="text-gray-600 mb-6">
          Got a challenge? Share it with ThinkBox and use our structured tools to explore creative and strategic solutions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Problem Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="E.g. How to increase sales for my online store?"
              className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Provide more details about the issue or context..."
              className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Personal">Personal</option>
              <option value="Academic">Academic</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            {loading ? "Submitting..." : "Submit Problem"}
          </button>
        </form>
      </div>
    </div>
  );
}
