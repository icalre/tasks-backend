import {Request, Response} from 'express';
import {TaskService} from '../services';
import {BaseController} from './base.controller';
import {TaskModel, TaskStatus, ResponseModel, HttpStatus} from '../models';
import {CustomError} from '../utilities';

export class TaskController extends BaseController<TaskModel> {

    private readonly emptyTask: Omit<TaskModel, 'id' | 'title'> = {
        description: '',
        status: TaskStatus.PENDING
    };

    private taskService: TaskService;

    constructor() {
        super();
        this.taskService = new TaskService();
    }

    public tasks = (_req: Request, res: Response<ResponseModel>) => {
        try {
            this.taskService.getAll().then((result) => {
                res.status(HttpStatus.OK).send(this.wrapResult(result));
            }).catch((error: CustomError) => this.sendErrorResponse(res, error));
        } catch (error: any) {
            this.sendErrorResponse(res, error);
        }
    };

    public store = (req: Request, res: Response<ResponseModel>) => {
        try {
            const {body}: { body: TaskModel } = req;

            const newTask = {
                ...this.emptyTask,
                ...body
            };

            this.taskService
                .create(newTask)
                .then((result) => {
                    res.status(HttpStatus.CREATED).send(this.wrapResult(result));
                })
                .catch((error: CustomError) => this.sendErrorResponse(res, error));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

    public show = (req: Request, res: Response<ResponseModel>) => {
        try {
            const {params: {id}} = req;

            this.taskService.getById(id)
                .then((result) => {
                    res.status(HttpStatus.OK).send(this.wrapResult(result));
                })
                .catch((error: CustomError) => this.sendErrorResponse(res, error));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

    public update = (req: Request, res: Response<ResponseModel>) => {
        try {
            const {params: {id}, body} = req;

            this.taskService.update({id, ...body})
                .then((result) => {
                    res.status(HttpStatus.OK).send(this.wrapResult(result));
                })
                .catch((error: CustomError) => this.sendErrorResponse(res, error));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    };

    public delete = (req: Request, res: Response<ResponseModel>) => {
        try {
            const {params: {id}} = req;

            this.taskService.delete(id)
                .then((result) => {
                    res.status(HttpStatus.OK).send(this.wrapResult(result));
                })
                .catch((error: CustomError) => this.sendErrorResponse(res, error));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    };

}
