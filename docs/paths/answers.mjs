export const answerPaths = {
  "/questions/{questionId}/answers": {
    post: {
      tags: ["Answers"],
      summary: "Create an answer for a question",
      parameters: [
        {
          in: "path",
          name: "questionId",
          required: true,
          schema: { type: "integer" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateAnswerBody" },
          },
        },
      },
      responses: {
        201: {
          description: "Created",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Answer created successfully." },
            },
          },
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Invalid request data." },
            },
          },
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Question not found." },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Unable to create answers." },
            },
          },
        },
      },
    },
    get: {
      tags: ["Answers"],
      summary: "Get answers for a question (each includes vote_count)",
      parameters: [
        {
          in: "path",
          name: "questionId",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DataAnswersResponse" },
            },
          },
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Question not found." },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Unable to fetch answers." },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Answers"],
      summary: "Delete all answers for a question",
      parameters: [
        {
          in: "path",
          name: "questionId",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: {
                message: "All answers for the question have been deleted successfully.",
              },
            },
          },
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Question not found." },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Unable to delete answers." },
            },
          },
        },
      },
    },
  },

  "/answers/{answerId}/vote": {
    post: {
      tags: ["Votes", "Answers"],
      summary: "Vote on an answer (agree/disagree)",
      parameters: [
        { in: "path", name: "answerId", required: true, schema: { type: "integer" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/VoteBody" } },
        },
      },
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Vote on the answer has been recorded successfully." },
            },
          },
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Invalid vote value." },
            },
          },
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Answer not found." },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Unable to vote answer." },
            },
          },
        },
      },
    },
  },
};

