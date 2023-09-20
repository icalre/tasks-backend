import {Response} from 'express';
import {DocumentData} from 'firebase-admin/firestore';

import {ResponseModel, HttpStatus} from '../models';
import {CustomError} from '../utilities';

export class BaseController<T extends DocumentData> {

    static defaultErrorResponse: ResponseModel = {
        success: false,
        message: 'An error occurred.',
        extraMessage: ''
    };

    private readonly responseMapper: {
        [key: string]: (extraMessage?: string) => ResponseModel;
    } = {
        [HttpStatus.BAD_REQUEST]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            message: 'Bad Request.',
            extraMessage
        }),
        [HttpStatus.UNAUTHORIZED]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            message: 'Unauthorized.',
            extraMessage
        }),
        [HttpStatus.FORBIDDEN_RESOURCE]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            message: "You don't have permissions to acces this resource.",
            extraMessage
        }),
        [HttpStatus.NOT_FOUND]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            message: 'Not Found.',
            extraMessage: extraMessage ?? 'Resource not found.'
        }),
        [HttpStatus.INTERNAL_SERVER_ERROR]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            extraMessage: extraMessage
        })
    };

    getErrorResponseBody(httpStatus: any, extraMessage?: string): ResponseModel {
        return this.responseMapper[httpStatus](extraMessage);
    }

    wrapResult(result: T | T[]): ResponseModel {
        return {
            success: true,
            data: result
        };
    }

    sendErrorResponse(res: Response, error: CustomError): void {
        let errorCode = 500;
        if (error.code && Object.values(HttpStatus).includes(error.code)) {
            errorCode = error.code;
        }

        res.status(errorCode).send(this.getErrorResponseBody(errorCode, error.message));
    }
}
