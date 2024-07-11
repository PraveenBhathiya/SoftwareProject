import {Batch} from '../models/batch.model.js';
import { errorHandler } from '../utils/error.js';

//create a batch
export const createBatch = async(req, res, next) => {
    const { batchName, batchCode } = req.body;

    if (!batchName || !batchCode || batchName === "" || batchCode === "") {
        return next(errorHandler(400, "All fileds are required"));
    }

    const newModule = new Batch({
        batchName,
        batchCode,
    });

    try {
        await newModule.save();
        res.json("New batch creation successfull!");
    } catch (error) {
        next(error);
    }
}

export const deleteBatch = async (req, res) => {
    const {batchCode } = req.params;
    try {
      const batch = await Batch.findByIdAndDelete(batchCode);
      if (batch) {
        res.json({ message: 'Batch deleted successfully' });
      } else {
        res.status(404).json({ message: 'Batch not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
