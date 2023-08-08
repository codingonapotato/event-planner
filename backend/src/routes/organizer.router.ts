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

organizerRouter.get('/:id/events', (req, res) => {
    const id = parseInt(req.params.id);
    Organizer.findEvents(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Could not find any events for this organizer');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

organizerRouter.get('/:id/stats', async (req, response) => {
    const id = parseInt(req.params.id);
    Organizer.getOrganizerStats(id).then(res => {
        response.status(200).json(res);
    }, err => {
        console.log(err);
        response.status(500).json(err);
    });
})

organizerRouter.get('/:id/starvolunteer', async (req, response) => {
    const id = parseInt(req.params.id);
    Organizer.getStarVolunteer(id).then(res => {
        response.status(200).send(res);
    }, err => {
        console.log(err);
        response.status(500).json(err);
    });
})

organizerRouter.get('/:id/starcustomer', async (req, response) => {
    const id = parseInt(req.params.id);
    Organizer.getStarCustomer(id).then(res => {
        response.status(200).send(res);
    }, err => {
        console.log(err);
        response.status(500).json(err);
    });
})

export default organizerRouter;