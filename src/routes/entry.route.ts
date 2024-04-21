import { Router } from 'express';
import * as controller from '../controllers/entry.controller';
import { UserMiddleware } from '../middlewares';
import { roles } from '../utils';
export const entry = Router();
// const userMiddleware = new UserMiddleware();
entry.post('/create', controller.createEntry);
entry.get('/get-by-id/:id', controller.getById);
entry.get('/get-all', controller.getAll);
entry.delete('/delete/:id', controller.deleteEntry);
entry.put('/edit/:id', controller.editEntry);

