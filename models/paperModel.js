const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  optionText: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [optionSchema], required: true },
  explanation: { type: String }
});

const paperSchema = new mongoose.Schema(
  {
    examType: { type: String, required: true },
    subjects: { type: [String], required: true },
    topics: { type: [String], required: true },
    sets: { type: Number, default: 1 },
    numberOfQuestions: { type: Number, required: true },
    questions: { type: [questionSchema], required: true },

    // 🔗 Link to the user who created the paper
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Paper", paperSchema);
