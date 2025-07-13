const Problem = require("../models/Problem");

const createProblem = async (req, res) => {
  const { title, description, category } = req.body;

  console.log("Create Problem – req.user:", req.user); 
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newProblem = await Problem.create({
      user: req.user._id,
      title,
      description,
      category,
    });

    res.status(201).json(newProblem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ user: req.user._id }).sort("-createdAt");
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateNotes = async (req, res) => {
  const { notes } = req.body;

  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    // Only the owner can update
    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    problem.notes = notes;
    await problem.save();

    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const addMindMapNode = async (req, res) => {
  const { label, parentId } = req.body;

  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const newNode = {
      id: Date.now().toString(),
      label,
      parentId: parentId || null,
    };

    problem.mindMap.push(newNode);
    await problem.save();

    res.status(200).json(problem.mindMap);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateSWOT = async (req, res) => {
  const { strengths, weaknesses, opportunities, threats } = req.body;

  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    problem.swot = { strengths, weaknesses, opportunities, threats };
    await problem.save();

    res.status(200).json(problem.swot);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const editProblem = async (req, res) => {
  const { title, description, category } = req.body;

  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    problem.title = title;
    problem.description = description;
    problem.category = category;
    await problem.save();

    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await problem.remove();
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = {
  createProblem,
  getUserProblems,
  updateNotes,
  addMindMapNode,
  updateSWOT,
  editProblem,
  deleteProblem
};
