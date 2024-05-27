const { Schema, model } = require("mongoose");

const supermarkets = require("../utils/supermarkets_enum");

const FoodSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: String,
    description: String,
    carbs: {
      type: Number,
      required: true,
    },
    fats: {
      type: Number,
      required: true,
    },
    proteins: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    supermarket: {
      type: String,
      enum: supermarkets,
      required: true,
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

module.exports = model("Food", FoodSchema, "foods");
