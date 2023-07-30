import { Router } from 'express';
import * as Shift from '../model/shift.model'

export const shiftRouter = Router();

shiftRouter.get('/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.findShift(id)
   .then((result) => {
      if (result.rows.length === 0) {
         res.status(404).send('shift not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

export default shiftRouter;


