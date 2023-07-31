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

ticketRouter.post('/:id/ticket-modify', (req, res) => {
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

export default ticketRouter;