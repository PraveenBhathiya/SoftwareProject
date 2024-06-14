import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
    {

        username:{
            type: String,
            required: true,
            unique: true,
        },
        regNo: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        batch:{
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

//export default Student;

const teacherSchema = new mongoose.Schema(
    {

        username:{
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

const adminSchema = new mongoose.Schema(
    {

        username:{
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model("Admin", adminSchema);

export {Student, Teacher, Admin};