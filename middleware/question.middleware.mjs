import { getQuestionById, getQuestionByTitleOrCategory } from "../repositories/question.repository.mjs";

// validate question body
export const questionBodyValidation = (req, res, next) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json(
      {
        "message": "Invalid request data.",
      }
    );
  }
  next();
}

// validate question id
export const questionIdValidation = async (req, res, next) => {
  const { questionId } = req.params;
  const question = await getQuestionById(questionId);
  if (!question) {
    return res.status(404).json(
      {
        "message": "Question not found.",
      }
    );
  }
  next();
}

// validate question title or category
export const questionTitleOrCategoryValidation = async (req, res, next) => {
  const { title, category } = req.query;
  const hasTitle = title != null && String(title).trim() !== "";
  const hasCategory = category != null && String(category).trim() !== "";
  const questions =
    hasTitle || hasCategory
      ? await getQuestionByTitleOrCategory(title, category)
      : [];
  if (!questions?.length) {
    return res.status(400).json({
      "message": "Invalid search parameters.",
    });
  }
  req.searchResults = questions;
  next();
};

// validate answer body: { "content": "..." } — max 300 characters
export const answerBodyValidation = (req, res, next) => {
  const { content } = req.body;
  if (content == null || String(content).trim() === "") {
    return res.status(400).json({
      message: "Invalid request data.",
    });
  }
  if (String(content).length > 300) {
    return res.status(400).json({
      message: "Invalid request data.",
    });
  }
  next();
};

// validate vote body: { "vote": 1 or -1 }
export const voteValidation = (req, res, next) => {
  const vote = Number(req.body?.vote);
  if (vote !== 1 && vote !== -1) {
    return res.status(400).json(
      {
        "message": "Invalid vote value.",
      }
    );
  }
  req.body.vote = vote;
  next();
};