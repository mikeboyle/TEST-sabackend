const express = require('express');
const { getAllGradesForStudent } = require('../../queries/v2/gradesQueriesV2');
const {
  getAllStudents,
  getStudentById,
} = require('../../queries/v2/studentsQueriesV2');

const studentsControllerV2 = express.Router();

studentsControllerV2.get('/', async (request, response) => {
  try {
    const students = await getAllStudents();

    // if path query has include=grades, attach each student's grades
    const { include } = request.query;
    if (include === 'grades') {
      // for each student...
      for (const student of students) {
        // get the students grades
        const grades = await getAllGradesForStudent(student.id);
        // set student.grades = grades
        student.grades = grades;
      }
    }

    response.status(200).json({ data: students });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

studentsControllerV2.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const student = await getStudentById(id);
    if (student) {
      // return 200
      return response.status(200).json({ data: student });
    }
    // return 404
    response
      .status(404)
      .json({ error: `Could not find student with id ${id}` });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

studentsControllerV2.get('/:id/grades', async (request, response) => {
  try {
    // Find the student with id - return 404 if not found
    const { id } = request.params;
    const student = await getStudentById(id);
    if (!student) {
      return response
        .status(404)
        .json({ error: `Could not find student with id ${id}` });
    }

    // Get all the grades for the student -- need v2/gradesQueries for this
    const grades = await getAllGradesForStudent(id);

    // return the grades with status 200
    response.status(200).json({ data: grades });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

module.exports = studentsControllerV2;
