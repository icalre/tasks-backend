import { Router } from "express";
import { TaskController } from "../controllers";
import {TaskMiddleware} from "../middlewares";

const router = Router();
const taskController = new TaskController();


//Get all Tasks
router.get('/', taskController.tasks);

//Create new Task
router.post('/',TaskMiddleware.validate,taskController.store);

//Show Task
router.get('/:id',taskController.show);

//Update Task
router.put('/:id',TaskMiddleware.validate,taskController.update);

//Delete Task
router.delete('/:id',taskController.delete);

export default router;
