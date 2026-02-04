export const CreateAnswerBody = {
  type: "object",
  required: ["content"],
  properties: {
    content: { type: "string", maxLength: 300 },
  },
};

