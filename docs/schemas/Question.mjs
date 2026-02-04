export const Question = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    description: { type: "string" },
    category: { type: "string" },
    vote_count: { type: "integer", description: "Sum of votes (+/-)" },
  },
};

