const studentsData = require('../studentsData.json');
const { students } = studentsData;

// return a copy of students (so it's safe to mutate this later)
const getAllStudents = () => [...students];

const getStudentById = (id) => {
  const student = students.find((el) => el.id === id);
  if (!student) {
    return null;
  }
  // return a copy of the student (so it safe to mutate later)
  return { ...student };
};

module.exports = {
  getAllStudents,
  getStudentById,
};
