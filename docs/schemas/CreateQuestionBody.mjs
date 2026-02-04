export const CreateQuestionBody = {
  type: "object",
  required: ["title", "description", "category"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    category: { type: "string", example: "Software" },
  },
};

