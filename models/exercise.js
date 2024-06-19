const { Schema, model } = require("mongoose");

const SeriesSchema = Schema(
  {
    weight: {
      type: String,
      required: true,
    },
    reps: {
      type: String,
      required: true,
    },
    rpe: {
      type: String,
      default: "10",
    },
    my_weight: {
      type: String,
      default: "0",
    },
    my_reps: {
      type: String,
      default: "0",
    },
    my_rpe: {
      type: String,
      default: "0",
    }
  },
  {
    versionKey: false,
  }
);


const ExerciseSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    series: [SeriesSchema],
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
