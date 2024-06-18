const { Schema, model } = require("mongoose");
const Exercise = require("./exercise").schema;

const RoutineSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    exercises: {
      type: [Exercise],
      required: true
    },
    day:{
      type: Number,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Routine", RoutineSchema, "routines");