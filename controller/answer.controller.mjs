import { voteAnswerService } from "../service/answer.service.mjs";

export const voteAnswerController = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { vote } = req.body;
    await voteAnswerService(answerId, vote);
    return res.status(200).json(
      {
        "message": "Vote on the answer has been recorded successfully.",
      }
    );  
  } catch {
    return res.status(500).json(
      {
        "message": "Unable to vote answer.",
      }
    );
  }
};
