import { Router } from 'express';
import Customer from '../model/customer.model';

export const customerRouter = Router();
const customer = new Customer;

customerRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    customer.findUser(id, res);
})

customerRouter.get('/dependant/:id', (req, res) => {
    const id = parseInt(req.params.id);
    customer.getDependant(id, res);
})

customerRouter.post('/dependant-modify/:id/:first_name/:last_name/:new_first_name/:new_last_name/:birthdate', (req, res) => {
    const id = parseInt(req.params.id);
    customer.modifyDependant(id, req, res);
})

customerRouter.put('/dependant-add/:id/:first_name/:last_name/:birthdate', (req, res) => {
    const id = parseInt(req.params.id);
    customer.addDependant(id, req, res);
})

customerRouter.delete('/dependant-remove/:id/:first_name/:last_name', (req, res) => {
    const id = parseInt(req.params.id);
    customer.removeDependant(id, req, res);
})
export default customerRouter;