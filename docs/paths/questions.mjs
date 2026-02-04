export const questionPaths = {
  "/questions": {
    post: {
      tags: ["Questions"],
      summary: "Create a question",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateQuestionBody" },
          },
        },
      },
      responses: {
        201: {
          description: "Created",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Question created successfully." },
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
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Unable to create question." },
            },
          },
        },
      },
    },
    get: {
      tags: ["Questions"],
      summary: "Get all questions (includes vote_count)",
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DataQuestionsResponse" },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Unable to fetch questions." },
            },
          },
        },
      },
    },
  },

  "/questions/search": {
    get: {
      tags: ["Questions"],
      summary: "Search questions by title and/or category (includes vote_count)",
      parameters: [
        { in: "query", name: "title", schema: { type: "string" } },
        { in: "query", name: "category", schema: { type: "string" } },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DataQuestionsResponse" },
            },
          },
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Invalid search parameters." },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Unable to fetch a question." },
            },
          },
        },
      },
    },
  },

  "/questions/{questionId}": {
    get: {
      tags: ["Questions"],
      summary: "Get a question by ID (includes vote_count)",
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
              schema: { $ref: "#/components/schemas/DataQuestionResponse" },
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
              example: { message: "Unable to fetch question." },
            },
          },
        },
      },
    },
    put: {
      tags: ["Questions"],
      summary: "Update a question",
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
            schema: { $ref: "#/components/schemas/CreateQuestionBody" },
          },
        },
      },
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Question updated successfully." },
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
              example: { message: "Unable to fetch questions." },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Questions"],
      summary: "Delete a question (and its answers)",
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
              example: { message: "Question post has been deleted successfully." },
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
              example: { message: "Unable to delete question." },
            },
          },
        },
      },
    },
  },

  "/questions/{questionId}/vote": {
    post: {
      tags: ["Votes", "Questions"],
      summary: "Vote on a question (agree/disagree)",
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
          "application/json": { schema: { $ref: "#/components/schemas/VoteBody" } },
        },
      },
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: {
                message: "Vote on the question has been recorded successfully.",
              },
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
              example: { message: "Question not found." },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { message: "Unable to vote question." },
            },
          },
        },
      },
    },
  },
};

