import { Router } from 'express';
import * as Event from '../model/event.model'


export const eventRouter = Router();

eventRouter.get('/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Event.findEvent(id)
   .then((result) => {
      if (result.rows.length === 0) {
         res.status(404).send('event not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

export default eventRouter;


