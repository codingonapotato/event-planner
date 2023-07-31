import { Router } from 'express';
import * as Organizer from '../model/organizer.model';

export const organizerRouter = Router();

organizerRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Organizer.findUser(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Organizer not found');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

export default organizerRouter;