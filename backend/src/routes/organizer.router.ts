import { Router } from 'express';
import Organizer from '../model/organizer.model';

export const organizerRouter = Router();
const organizer = new Organizer();

organizerRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    organizer.findUser(id, res);
})

export default organizerRouter;