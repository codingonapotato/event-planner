import { Router } from 'express';
import * as Volunteer from '../model/volunteer.model';

export const volunteerRouter = Router();

volunteerRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Volunteer.findUser(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Volunteer not found');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

volunteerRouter.get('/hours-volunteered/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Volunteer.findHoursVolunteered(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Volunteer not found');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

volunteerRouter.get('/shifts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Volunteer.findShifts(id).then((result) => {
        if (result === - 1) {
            res.status(404).send('Could not retrieve volunteer shifts :(');
        } else {
            res.status(200).send(result);
        }
    }).catch((err) => {
        res.status(500).send('Database query failed');
    });
})

export default volunteerRouter;