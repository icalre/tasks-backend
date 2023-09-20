import { Router } from "express";
import TaskRoute from "./task.route";

const router = Router();

router.use('/tasks', TaskRoute);

export default router;
