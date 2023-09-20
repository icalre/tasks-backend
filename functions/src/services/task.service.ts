import { TaskModel } from '../models';

import { BaseService } from './base.service';

export class TaskService extends BaseService<TaskModel> {
    static collectionName = 'tasks';

    constructor() {
        super(TaskService.collectionName);
    }

    create(task: TaskModel) {
        return this.repository.create(task);
    }

    update(task: TaskModel) {
        return this.repository.updateById(task.id || '', task);
    }

    getAll() {
        return this.repository.findAll();
    }

    getById(id: string) {
        return this.repository.checkExistance(id);
    }

    delete(id: string) {
        return this.repository.deleteById(id);
    }
}
