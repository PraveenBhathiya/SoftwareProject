import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema(
    {
        moduleName:{
            type: String,
            required: true,
            unique: true,
        },
        moduleCode: {
            type: String,
            required: true,
            unique: true,
        },
        batch:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }

);

const Module = mongoose.model("Module", moduleSchema);


export {Module};