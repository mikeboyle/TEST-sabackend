const db = require('../../db');

const getAllGradesForStudent = async (id) => {
  const grades = await db.any('SELECT * FROM grades where student_id = $1', [
    id,
  ]);
  return grades;
};

module.exports = {
  getAllGradesForStudent,
};
