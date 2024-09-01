const Marks = require('./marks_model');
const Student = require('./student_model'); // Import the Student model

// Controller to fetch student information (registration numbers and names)
const getStudentData = async (req, res) => {
  try {
    const students = await Student.find({}, 'regNo username'); // Fetch only regNo and username
    res.json(students); // Send the data to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student data', error });
  }
};

// Controller to save marks entered by the teacher
const saveMarks = async (req, res) => {
  try {
    const { marks } = req.body; // Expecting an array of marks data

    const savedMarks = [];

    for (const markData of marks) {
      const { regNo, username, presentationMark, vivaMark, contributionMark } = markData;

      const newMark = new Marks({
        regNo,
        username,
        presentationMark,
        vivaMark,
        contributionMark,
      });

      const savedMark = await newMark.save();
      savedMarks.push(savedMark);
    }

    res.status(201).json({ message: 'Marks saved successfully', data: savedMarks });
  } catch (error) {
    res.status(500).json({ message: 'Error saving marks', error });
  }
};

module.exports = {
  getStudentData,
  saveMarks,
};