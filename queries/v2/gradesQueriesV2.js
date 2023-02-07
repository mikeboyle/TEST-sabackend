const gradesData = require('../../data/v2/gradesDataV2.json');
const { grades } = gradesData;

const getAllGradesForStudent = (id) => {
  // create an array to hold results
  const results = [];

  // for each grade...
  for (const grade of grades) {
    // get the grade's studentId
    const { studentId } = grade;
    // if studentId === id...
    if (studentId === id) {
      // copy the grade and push to results
      results.push({ ...grade });
    }
  }

  // return the results
  return results;
};

module.exports = {
  getAllGradesForStudent,
};
