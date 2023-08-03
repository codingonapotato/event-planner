import { Router } from 'express';
import * as Customer from '../model/customer.model';

export const customerRouter = Router();

customerRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Customer.findUser(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Customer not found');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

customerRouter.get('/dependant/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Customer.getDependant(id).then((result) => {
        if (result === -1) {
            res.status(404).send(`User with id: ${id} does not have any dependants`);
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    })
})

customerRouter.post('/dependant-modify/:id/:first_name/:last_name/', (req, res) => {
    const id = parseInt(req.params.id);
    Customer.modifyDependant(id, req).then((result) => {
        if (result === -1) {
            res.status(404).send(`Something unexpected has occured while modifying information of dependant 
            ${req.params.first_name}, ${req.params.last_name}`);
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

customerRouter.put('/dependant-add/:id/', (req, res) => {
    const id = parseInt(req.params.id);
    Customer.addDependant(id, req).then((result) => {
        if (result === -1) {
            res.status(404).send(`Dependant Creation for User with id: ${id} failed :(`);
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    })
})

customerRouter.delete('/dependant-remove/:id/:first_name/:last_name', (req, res) => {
    const id = parseInt(req.params.id);
    Customer.removeDependant(id, req).then((result) => {
        if (result === -1) {
            res.status(404).send(`Something unexpected has occured while trying to remove dependant 
            ${req.params.first_name}, ${req.params.last_name}`);
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})
export default customerRouter;

customerRouter.get('/tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Customer.findTickets(id).then((result) => {
        if (result === -1) {
            res.status(404).send(`Could not retrieve tickets for customer with id = ${id}`);
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
});