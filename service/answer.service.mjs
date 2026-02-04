import { getAnswerById, voteAnswer } from "../repositories/answer.repository.mjs";

export const getAnswerByIdService = async (id) => {
  const answer = await getAnswerById(id);
  return answer;
};

export const voteAnswerService = async (answerId, vote) => {
  const record = await voteAnswer(answerId, vote);
  return record;
};
