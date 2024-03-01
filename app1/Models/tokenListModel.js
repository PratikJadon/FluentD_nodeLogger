import mongoose from "mongoose";

const tokenListSchema = new mongoose.Schema([
  {
    token: {
      type: String,
      required: [true, "Please provide newly created token."],
    },
  },
]);

export default mongoose.model("tokenList", tokenListSchema);
