import pool from "../utils/db.mjs";

// Create a new question
export const createQuestion = async (questionBody) => {
  const {title, description, category} = questionBody;
  const query = `INSERT INTO questions (title, description, category) VALUES ($1, $2, $3) RETURNING *`;
  const values = [title, description, category];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get all questions (with vote count: sum of question_votes, can be + or -)
export const getQuestions = async () => {
  const query = `
    SELECT q.*, COALESCE(SUM(qv.vote), 0)::int AS vote_count
    FROM questions q
    LEFT JOIN question_votes qv ON q.id = qv.question_id
    GROUP BY q.id
  `;
  const result = await pool.query(query);
  return result.rows;
};

// Get a question by id (with vote count)
export const getQuestionById = async (id) => {
  const query = `
    SELECT q.*, COALESCE(SUM(qv.vote), 0)::int AS vote_count
    FROM questions q
    LEFT JOIN question_votes qv ON q.id = qv.question_id
    WHERE q.id = $1
    GROUP BY q.id
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Update a question
export const updateQuestion = async (id, questionBody) => {
  const { title, description, category } = questionBody;
  const query = `UPDATE questions SET title = $1, description = $2, category = $3 WHERE id = $4 RETURNING *`;
  const value = [title, description, category, id];
  const result = await pool.query(query, value);
  return result.rows[0];
};

// Delete a question by id
export const deleteQuestion = async (id) => {
  const query = `DELETE FROM questions WHERE id = $1 RETURNING *`;
  const value = [id];
  const result = await pool.query(query, value);
  return result.rows[0];
};

// get questions by title and/or category (at least one required)
export const getQuestionByTitleOrCategory = async (title, category) => {
  const hasTitle = title != null && String(title).trim() !== "";
  const hasCategory = category != null && String(category).trim() !== "";
  let query;
  let values;
  if (hasTitle && hasCategory) {
    query = `
      SELECT q.*, COALESCE(SUM(qv.vote), 0)::int AS vote_count
      FROM questions q
      LEFT JOIN question_votes qv ON q.id = qv.question_id
      WHERE q.title = $1 OR q.category = $2
      GROUP BY q.id
    `;
    values = [String(title).trim(), String(category).trim()];
  } else if (hasTitle) {
    query = `
      SELECT q.*, COALESCE(SUM(qv.vote), 0)::int AS vote_count
      FROM questions q
      LEFT JOIN question_votes qv ON q.id = qv.question_id
      WHERE q.title = $1
      GROUP BY q.id
    `;
    values = [String(title).trim()];
  } else if (hasCategory) {
    query = `
      SELECT q.*, COALESCE(SUM(qv.vote), 0)::int AS vote_count
      FROM questions q
      LEFT JOIN question_votes qv ON q.id = qv.question_id
      WHERE q.category = $1
      GROUP BY q.id
    `;
    values = [String(category).trim()];
  } else {
    return [];
  }
  const result = await pool.query(query, values);
  return result.rows;
};

// post a new answer to a question
export const postAnswerToQuestion = async (questionId, answerBody) => {
  const { content } = answerBody;
  const query = `INSERT INTO answers (question_id, content) VALUES ($1, $2) RETURNING *`;
  const values = [questionId, content];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// get answers for a question (with vote count per answer: + or -)
export const getAnswersForQuestion = async (questionId) => {
  const query = `
    SELECT a.*, COALESCE(SUM(av.vote), 0)::int AS vote_count
    FROM answers a
    LEFT JOIN answer_votes av ON a.id = av.answer_id
    WHERE a.question_id = $1
    GROUP BY a.id
  `;
  const result = await pool.query(query, [questionId]);
  return result.rows;
};

// delete all answers for a question
export const deleteAnswer = async (questionId) => {
  const query = `DELETE FROM answers WHERE question_id = $1 RETURNING *`;
  const values = [questionId];
  const result = await pool.query(query, values);
  return result.rows;
};

// record a vote on a question (vote is 1 or -1). Table: question_votes(question_id, vote)
export const voteQuestion = async (questionId, vote) => {
  const query = `INSERT INTO question_votes (question_id, vote) VALUES ($1, $2) RETURNING *`;
  const values = [questionId, vote];
  const result = await pool.query(query, values);
  return result.rows[0];
};