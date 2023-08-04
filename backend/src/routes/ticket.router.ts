import { Router } from 'express';
import * as Ticket from '../model/ticket.model';

export const ticketRouter = Router();

ticketRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Ticket.findTicket(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Ticket not found');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

ticketRouter.get('/tier/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Ticket.findTier(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Tier not found');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

ticketRouter.post('/modify/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Ticket.modifyTicket(id, req).then((result) => {
        if (result === - 1) {
            res.status(404).send(`Ticket with id: ${id} could not be updated`);
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

ticketRouter.put('/create', (req, res) => {
    Ticket.createTicket(req.body).then((result) => {
        if (result === - 1) {
            res.status(404).send(`Could not create a new ticket :(`);
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

ticketRouter.delete('/remove/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Ticket.removeTicket(id).then((result) => {
        if (result === - 1) {
            res.status(404).send(`Could not delete ticket`);
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

export default ticketRouter;