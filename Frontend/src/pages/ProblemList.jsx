import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProblems } from "../features/problems/problemSlice";
import { Link } from "react-router-dom";

export default function ProblemList() {
  const dispatch = useDispatch();
  const { problems, loading, error } = useSelector((state) => state.problems);

  useEffect(() => {
    dispatch(getProblems());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-2">📋 Your Problems</h2>
        <p className="text-gray-600 text-md">
          Review, manage, and explore your submitted challenges.
        </p>
      </div>

      {loading && (
        <div className="text-center py-6">
          <p className="text-gray-500">Loading problems...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 py-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && problems.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          <p>No problems submitted yet.</p>
          <Link
            to="/submit"
            className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
          >
            Submit a Problem
          </Link>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {problems.map((problem) => (
          <div
            key={problem._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-200"
          >
            <h3 className="text-xl font-semibold text-purple-800 mb-1">
              {problem.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Category: <span className="font-medium">{problem.category}</span>
            </p>
            <p className="text-gray-700 text-sm line-clamp-3 mb-3">
              {problem.description}
            </p>
            <p className="text-xs text-gray-400">
              Submitted on: {new Date(problem.createdAt).toLocaleString()}
            </p>
            <Link
              to={`/problems/${problem._id}`}
              className="inline-block mt-4 text-sm text-purple-600 hover:underline font-medium"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
