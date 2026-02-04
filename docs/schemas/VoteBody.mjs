export const VoteBody = {
  type: "object",
  required: ["vote"],
  properties: {
    vote: { type: "integer", enum: [1, -1], description: "1 or -1" },
  },
};

