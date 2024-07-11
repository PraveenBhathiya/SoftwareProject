import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema(
    {
        batchName:{
            type: String,
            required: true,
            unique: true,
        },
        batchCode: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }

);

const Batch = mongoose.model("Batch", batchSchema);


export {Batch};