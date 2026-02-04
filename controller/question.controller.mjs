import { createQuestionService, getQuestionsService, questionByIdService, updateQuestionService, deleteQuestionService, postAnswerToQuestionService, getAnswersForQuestionService, deleteAnswerService, voteQuestionService } from "../service/question.service.mjs";

export const createQuestionController = async (req, res) => {
  try {
    const questionBody = req.body;
    await createQuestionService(questionBody);
    return res.status(201).json({
      message: "Question created successfully.",
    });
  } catch {
    return res.status(500).json(
      {
        "message": "Unable to create question."
      }
    );
  }
};

export const getQuestionsController = async (req, res) => {
  try {
    const questions = await getQuestionsService();
    return res.status(200).json(
      {
        "data": questions,
      }
    );
  } catch {
    return res.status(500).json(
      {
        "message": "Unable to fetch questions."
      }
    );
  }
};

export const questionByIdController = async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await questionByIdService(questionId);
    return res.status(200).json(
      {
        "data": question,
      }
    );
  } catch {
    return res.status(500).json(
      {
        "message": "Unable to fetch question."
      }
    );
  }
};

export const updateQuestionController = async (req, res) => {
  try {
    const { questionId } = req.params;
    const questionBody = req.body;
    await updateQuestionService(questionId, questionBody);
    return res.status(200).json(
      {
        "message": "Question updated successfully."
      }
    );
  } catch {
    return res.status(500).json(
      {
        "message": "Unable to fetch questions."
      }
    );
  }
};

export const deleteQuestionController = async (req, res) => {
  try {
    const { questionId } = req.params;
    await deleteQuestionService(questionId);
    return res.status(200).json(
      {
        "message": "Question post has been deleted successfully."
      }
    );
  } catch {
    return res.status(500).json(
      {
        "message": "Unable to delete question."
      }
    );
  }
};

export const getQuestionByTitleOrCategoryController = async (req, res) => {
  try {
    const questions = req.searchResults;
    return res.status(200).json({
      data: questions,
    });
  } catch {
    return res.status(500).json({
      "message": "Unable to fetch a question.",
    });
  }
};

export const postAnswerToQuestionController = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answerBody = req.body;
    await postAnswerToQuestionService(questionId, answerBody);
    return res.status(201).json(
      {
        "message": "Answer created successfully."
      }
    );
  } catch {
    return res.status(500).json(
      {
        "message": "Unable to create answers."
      }
    );
  }
};

export const getAnswersForQuestionController = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await getAnswersForQuestionService(questionId);
    return res.status(200).json(
      {
        "data": answers,
      }
    );
  } catch {
    1
    return res.status(500).json(
      {
        "message": "Unable to fetch answers."
      }
    );
  }
};

export const deleteAnswerController = async (req, res) => {
  try {
    const { questionId } = req.params;
    await deleteAnswerService(questionId);
    return res.status(200).json({
      "message": "All answers for the question have been deleted successfully.",
    });
  } catch {
    return res.status(500).json({
      "message": "Unable to delete answers.",
    });
  }
};

export const voteQuestionController = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { vote } = req.body;
    await voteQuestionService(questionId, vote);
    return res.status(200).json(
      {
        "message": "Vote on the question has been recorded successfully.",
      }
    );
  } catch {
    return res.status(500).json(
      {
        "message": "Unable to vote question.",
      }
    );
  }
};