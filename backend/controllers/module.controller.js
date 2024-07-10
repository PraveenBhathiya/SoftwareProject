import {Module} from '../models/modules.model.js';
import { errorHandler } from '../utils/error.js';

//create a module
export const createModule = async(req, res, next) => {
    const { moduleName, moduleCode, batch } = req.body;

    if (!moduleName || !moduleCode || !batch || moduleName === "" || moduleCode === "" || batch === "") {
        return next(errorHandler(400, "All fileds are required"));
    }

    const newModule = new Module({
        moduleName,
        moduleCode,
        batch,
    });

    try {
        await newModule.save();
        res.json("Module creation successfull!");
    } catch (error) {
        next(error);
    }
}
