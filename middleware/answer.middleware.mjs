import { getAnswerById } from "../repositories/answer.repository.mjs";

// validate answer exists (for vote, etc.)
export const answerIdValidation = async (req, res, next) => {
  const { answerId } = req.params;
  const answer = await getAnswerById(answerId);
  if (!answer) {
    return res.status(404).json({
      message: "Answer not found.",
    });
  }
  next();
};
