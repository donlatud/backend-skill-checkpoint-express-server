export const DataQuestionsResponse = {
  type: "object",
  properties: {
    data: { type: "array", items: { $ref: "#/components/schemas/Question" } },
  },
};

export const DataQuestionResponse = {
  type: "object",
  properties: {
    data: { $ref: "#/components/schemas/Question" },
  },
};

export const DataAnswersResponse = {
  type: "object",
  properties: {
    data: { type: "array", items: { $ref: "#/components/schemas/Answer" } },
  },
};

