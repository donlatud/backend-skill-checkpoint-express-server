export const Answer = {
  type: "object",
  properties: {
    id: { type: "integer" },
    question_id: { type: "integer" },
    content: { type: "string" },
    vote_count: { type: "integer", description: "Sum of votes (+/-)" },
  },
};

