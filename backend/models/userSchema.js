const Joi = require("joi");
const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let validator = require("validator");

const Scrypt = require("scrypt-kdf");
const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  indexNumber: {
    type: String,
    required: [true, "Please enter your index number"],
    minLength: [5, "Enter vaild index number"],
  },
  role: {
    type: String, // ADMIN, TEACHER, STUDENT
    required: [true, "Provide valid role"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  batch: {
    type: Number,
    required: [true, "Batch is need to provide"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  profilePictureURL: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: "Please provide a valid URL",
    },
    maxLength: [2048, "URL cannot exceed 2048 characters!"],
  },
  teamIndexNumber: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  projectId: {
    type: String,
  },
  profileState: {
    type: Boolean,
    default: false,
  },
});

// ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const keyBuf = await Scrypt.kdf(this.password, { logN: 15 });
    this.password = keyBuf.toString("base64");
    return next();
  } catch (error) {
    return next(error);
  }
});

// COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
usersSchema.methods.comparePassword = async function (enteredPassword) {
  // The entered password should be passed as a buffer
  const keyBuf = Buffer.from(enteredPassword);
  // Decode the stored password from base64 to a buffer
  const storedKeyBuf = Buffer.from(this.password, "base64");
  // Verify the entered password against the stored password
  return await Scrypt.verify(storedKeyBuf, keyBuf);
};

// GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS
usersSchema.methods.generateJWTToken = function () {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d"; // Default to 7 days if not provided
  return jwt.sign(
    { id: this._id, role: this.role }, // Include role in the token
    process.env.JWT_SECRET_KEY,
    { expiresIn }
  );
};

const User = mongoose.model("User", usersSchema);

module.exports = User;
