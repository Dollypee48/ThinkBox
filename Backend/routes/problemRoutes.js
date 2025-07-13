const express = require("express");
const router = express.Router();
const {
  createProblem,
  getUserProblems,
  updateNotes,
  addMindMapNode,
  updateSWOT,
  editProblem,
  deleteProblem,
} = require("../controllers/problemController");

const { protect } = require("../middleware/authMiddleware");



router.post("/", protect, createProblem);
router.get("/", protect, getUserProblems);
router.put("/notes/:id", protect, updateNotes);
router.post("/mindmap/:id", protect, addMindMapNode);
router.put("/swot/:id", protect, updateSWOT);
router.put("/edit/:id", protect, editProblem);
router.delete("/:id", protect, deleteProblem);

module.exports = router;
