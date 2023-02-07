const db = require('../../db');

const getAllStudents = async () => {
  const students = await db.any('SELECT * FROM students');
  return students;
};

const getStudentById = async (id) => {
  const student = await db.oneOrNone('SELECT * FROM students where id = $1', [
    id,
  ]);
  return student;
};

module.exports = {
  getAllStudents,
  getStudentById,
};
