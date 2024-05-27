const { Schema, model } = require("mongoose");

const RoutineSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    exercises: {
      type: Array,
      required: true
    },
    day:{
      type: Date,
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