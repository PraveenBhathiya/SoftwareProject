import {Marks} from '../models/marks.model.js';
import {Student} from '../models/user.model.js'

// Controller to fetch student information (registration numbers and names)
const getStudentData = async (req, res) => {
  // try {
  //   const students = await Student.find({}, 'regNo username'); // Fetch only regNo and username
  //   res.json(students); // Send the data to the frontend
  // } catch (error) {
  //   res.status(500).json({ message: 'Error fetching student data', error });
  // }
  const students = await Student.find({}).sort({createdAt: -1})

    res.status(200).json(students)
};

// Controller to save marks entered by the teacher
const saveMarks = async (req, res) => {
  const { marks } = req.body;
  try {
    for (const markData of marks) {
      const { regNo, username, presentationMark, vivaMark, contributionMark } = markData;
      
      // Update or create the marks for each student
      await Marks.findOneAndUpdate(
        { regNo , username},
        { presentationMark, vivaMark, contributionMark },
        { new: true, upsert: true } // Create new document if not found
      );
    }
    res.status(200).json({ message: 'Marks saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving marks', error });
  }
};
export{ getStudentData, saveMarks};