import request from "supertest";
import app from "../src/local";
import {HttpStatus} from "../src/models";

let taskId: string = '';

describe('GET /tasks', () => {
    it('Its Ok', async () => {
        const response = await request(app).get('/api/tasks').expect(HttpStatus.OK);
        const {data} = response.body;
        expect(data).toBeInstanceOf(Array);
    });
});

describe('POST /tasks', () => {
    it('Validation its Ok', async () => {
        const response = await request(app).post('/api/tasks').send({}).expect(HttpStatus.BAD_REQUEST);
        const {success, message, extraMessage} = response.body;
        expect(success).toBe(false);
        expect(message).toBe('An error occurred.');
        expect(extraMessage[0].field).toBe('title');
        expect(extraMessage[0].message).toBe('title is a required field');
        expect(extraMessage[1].field).toBe('description');
        expect(extraMessage[1].message).toBe('description is a required field');
    });

    it('Create Task its Ok', async () => {
        const response = await request(app).post('/api/tasks').send({
            title: "Nueva Tarea",
            description: "Esta es una nueva tarea"
        }).expect(HttpStatus.CREATED);
        const {success, data} = response.body;
        taskId = data.id;
        expect(success).toBe(true);
        expect(typeof data.id).toBe('string');
        expect(data.title).toBe('Nueva Tarea');
        expect(data.description).toBe('Esta es una nueva tarea');
        expect(data.status).toBe('Pending');
    });
});


describe('GET /tasks/:id', () => {
    it('Get Tasks its Ok', async () => {
        const response = await request(app).get('/api/tasks/' + taskId).expect(HttpStatus.OK);
        const {success, data} = response.body;
        expect(success).toBe(true);
        expect(data.id).toBe(taskId);
        expect(data.title).toBe('Nueva Tarea');
        expect(data.description).toBe('Esta es una nueva tarea');
        expect(data.status).toBe('Pending');
    });
});

describe('PUT /tasks/:id', () => {
    it('Update Tasks its Ok', async () => {
        const response = await request(app).put('/api/tasks/' + taskId).send({
            title: "Nueva Tarea",
            description: "Esta es una nueva tarea",
            status: 'Completed'
        }).expect(HttpStatus.OK);
        const {success, data} = response.body;
        expect(success).toBe(true);
        expect(data.id).toBe(taskId);
        expect(data.status).toBe('Completed');
    });
});

describe('DELETE /tasks/:id', () => {
    it('Delete Tasks its Ok', async () => {
        const response = await request(app).delete('/api/tasks/' + taskId).expect(HttpStatus.OK);
        const {success, data} = response.body;
        expect(success).toBe(true);
        expect(data.id).toBe(taskId);
    });
});

