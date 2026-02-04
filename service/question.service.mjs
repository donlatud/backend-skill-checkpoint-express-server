import { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion, getQuestionByTitleOrCategory, postAnswerToQuestion, getAnswersForQuestion, deleteAnswer, voteQuestion } from "../repositories/question.repository.mjs";

// Create question service
export const createQuestionService = async (questionBody) => {
  const question = await createQuestion(questionBody);
  return question;
};

// Get all questions service
export const getQuestionsService = async () => {
  const questions = await getQuestions();
  return questions;
};

export const questionByIdService = async (id) => {
  const question = await getQuestionById(id);
  return question;
};

export const updateQuestionService = async (id, questionBody) => {
  const question = await updateQuestion(id, questionBody);
  return question;
};

export const deleteQuestionService = async (id) => {
  await deleteAnswer(id);
  const question = await deleteQuestion(id);
  return question;
};

export const getQuestionByTitleOrCategoryService = async (title, category) => {
  const question = await getQuestionByTitleOrCategory(title, category);
  return question;
};

export const postAnswerToQuestionService = async (questionId, answerBody) => {
  const answer = await postAnswerToQuestion(questionId, answerBody);
  return answer;
};

export const getAnswersForQuestionService = async (questionId) => {
  const answers = await getAnswersForQuestion(questionId);
  return answers;
};

export const deleteAnswerService = async (questionId) => {
  const deleted = await deleteAnswer(questionId);
  return deleted;
};

export const voteQuestionService = async (questionId, vote) => {
  const record = await voteQuestion(questionId, vote);
  return record;
};