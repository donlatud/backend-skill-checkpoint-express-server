import pool from "../utils/db.mjs";

// get an answer by id
export const getAnswerById = async (id) => {
  const query = `SELECT * FROM answers WHERE id = $1`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// record a vote on an answer (vote is 1 or -1). Table: answer_votes(answer_id, vote)
export const voteAnswer = async (answerId, vote) => {
  const query = `INSERT INTO answer_votes (answer_id, vote) VALUES ($1, $2) RETURNING *`;
  const values = [answerId, vote];
  const result = await pool.query(query, values);
  return result.rows[0];
};
