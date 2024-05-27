const { Schema, model } = require("mongoose");

const ExerciseSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Exercise", ExerciseSchema, "exercises");
