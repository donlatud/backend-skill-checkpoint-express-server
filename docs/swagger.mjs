import { questionPaths } from "./paths/questions.mjs";
import { answerPaths } from "./paths/answers.mjs";

import { VoteBody } from "./schemas/VoteBody.mjs";
import { CreateQuestionBody } from "./schemas/CreateQuestionBody.mjs";
import { CreateAnswerBody } from "./schemas/CreateAnswerBody.mjs";
import { MessageResponse } from "./schemas/MessageResponse.mjs";
import { Question } from "./schemas/Question.mjs";
import { Answer } from "./schemas/Answer.mjs";
import {
  DataAnswersResponse,
  DataQuestionResponse,
  DataQuestionsResponse,
} from "./schemas/DataResponses.mjs";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Questions & Answers API",
    version: "1.0.0",
    description:
      "REST API for questions, answers, search, and voting (agree/disagree).",
  },
  servers: [{ url: "http://localhost:4000" }],
  tags: [
    { name: "Questions" },
    { name: "Answers" },
    { name: "Votes" },
  ],
  components: {
    schemas: {
      VoteBody,
      CreateQuestionBody,
      CreateAnswerBody,
      MessageResponse,
      Question,
      Answer,
      DataQuestionsResponse,
      DataQuestionResponse,
      DataAnswersResponse,
    },
  },
  paths: {
    ...questionPaths,
    ...answerPaths,
  },
};

export default swaggerSpec;

