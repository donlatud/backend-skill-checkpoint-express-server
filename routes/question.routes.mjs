import { Router } from "express";
import { createQuestionController, getQuestionsController, questionByIdController, updateQuestionController, deleteQuestionController, getQuestionByTitleOrCategoryController, postAnswerToQuestionController, getAnswersForQuestionController, deleteAnswerController, voteQuestionController } from "../controller/question.controller.mjs";
import { questionBodyValidation, answerBodyValidation, voteValidation, questionIdValidation, questionTitleOrCategoryValidation } from "../middleware/question.middleware.mjs";

const router = Router();

router.post("/", questionBodyValidation, createQuestionController);
router.get("/", getQuestionsController);
router.get("/search", questionTitleOrCategoryValidation, getQuestionByTitleOrCategoryController);
router.get("/:questionId", questionIdValidation, questionByIdController);
router.post("/:questionId/vote", voteValidation, questionIdValidation, voteQuestionController);
router.put("/:questionId", questionBodyValidation, questionIdValidation, updateQuestionController);
router.delete("/:questionId", questionIdValidation, deleteQuestionController);
router.post("/:questionId/answers", answerBodyValidation, questionIdValidation, postAnswerToQuestionController);
router.get("/:questionId/answers", questionIdValidation, getAnswersForQuestionController);
router.delete("/:questionId/answers", questionIdValidation, deleteAnswerController);

export default router;
