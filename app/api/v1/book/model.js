const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const bookSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    qty: {
      type: Number,
      min: [0, "Quantity cannot be less than zero"],
      required: [true, "Quantity is required"],
      default: 1,
    },
    price: {
      type: Number,
      min: [0, "Price cannot be less than zero"],
      required: [true, "Price is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Book", bookSchema);
