import {DocumentData} from "firebase/firestore";
import {BaseService} from "../services";
import {Request} from "express";

export interface RequestModel<
    T extends DocumentData,
    TService extends BaseService<T>
> extends Request {
    service: TService;
}
