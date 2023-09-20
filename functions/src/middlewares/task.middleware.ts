import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';
import {HttpStatus, ResponseModel} from "../models";
import {BaseController} from "../controllers";
import {ErrorMessages} from "../utilities";
import {createValidationsAdapter} from "../adapters";

export class TaskMiddleware {

    public static validate = (req: Request,
                              res: Response<ResponseModel>,
                              next: NextFunction) => {
        try {
            const {body} = req;
            const taskRules = Joi.object({
                title: Joi.string().empty().regex(/^[a-zA-Z0-9, ]*$/, 'Alphanumerics, space and comma characters').required(),
                description: Joi.string().empty().required(),
                status:Joi.string().empty()
            }).messages(ErrorMessages).options({
                abortEarly: false,
                errors: {
                    wrap: {
                        label: false,
                    }
                }
            });

            const {error} = taskRules.validate(body);

            if (error) {
                res.status(HttpStatus.BAD_REQUEST).send({
                    ...BaseController.defaultErrorResponse,
                    extraMessage: createValidationsAdapter(error.details)
                });
            } else {
                next();
            }


        } catch (error: any) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                ...BaseController.defaultErrorResponse,
                extraMessage: error.message
            });
        }

    }
}
