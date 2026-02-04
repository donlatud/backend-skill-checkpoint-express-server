import { Router } from "express";
import { voteAnswerController } from "../controller/answer.controller.mjs";
import { voteValidation } from "../middleware/question.middleware.mjs";
import { answerIdValidation } from "../middleware/answer.middleware.mjs";

const router = Router();

router.post("/:answerId/vote", voteValidation, answerIdValidation, voteAnswerController);

export default router;
