const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    balance: {
      type: Number,
      min: [0, "Balance cannot be less than zero"],
      required: [true, "Balance is required"],
      default: 0,
    }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return password == this.password;
};

module.exports = model("User", userSchema);