import { useState } from "react";
import axios from "axios";

export default function MindMap({ problemId, existingMap = [], onUpdate }) {
  const [label, setLabel] = useState("");
  const [parentId, setParentId] = useState("");

  const addNode = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post(
        `http://localhost:5000/api/problems/${problemId}/mindmap`,
        { label, parentId: parentId || null },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      onUpdate(res.data); // update in parent
      setLabel("");
      setParentId("");
    } catch (err) {
      console.error(err);
    }
  };

  const renderTree = (nodes, parentId = null, depth = 0) => {
    return nodes
      .filter((node) => node.parentId === parentId)
      .map((node) => (
        <div key={node.id} style={{ marginLeft: depth * 20 }} className="mb-1">
          <span>🔹 {node.label}</span>
          <div>{renderTree(nodes, node.id, depth + 1)}</div>
        </div>
      ));
  };

  return (
    <div className="bg-white p-4 mt-6 shadow rounded">
      <h3 className="text-xl font-semibold mb-2">🌳 Mind Map</h3>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Node label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Root</option>
          {existingMap.map((node) => (
            <option key={node.id} value={node.id}>
              {node.label}
            </option>
          ))}
        </select>
        <button
          onClick={addNode}
          className="bg-blue-600 text-white px-3 py-2 rounded ml-2"
        >
          Add Node
        </button>
      </div>

      <div className="text-sm">{renderTree(existingMap)}</div>
    </div>
  );
}
