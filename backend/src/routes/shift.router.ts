import { Router } from 'express';
import * as Shift from '../model/shift.model'

export const shiftRouter = Router();

// - Sends a query from the URI:id to the database
// - responds with a tuple of shift on success with status(200)
// - responds with status(404) if query is not in the database
// - responds with status(500) if the query fails otherwise
shiftRouter.get('/shiftID/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.get_using_shiftID(id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('shift not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

shiftRouter.get('/eventID/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.get_using_eventID(id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('shift not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

shiftRouter.get('/volunteerID/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.get_using_volunteerID(id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('shift not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

/**
 * updates all attributes in shift given the initial shift_id in the URI
 * Attributes to be changed are passed through req.body and they must 
 * include: new_id, role, start_time, end_time, station
 */
shiftRouter.post('/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   const {new_id, role, start_time, end_time, station} = req.body;

   Shift.updateShift(id,new_id,role, start_time, end_time, station)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('shift not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

/**
 * Creates a new shift using info from request body
 * The request body must contain the following fields:
 * new_id, role, start_time, end_time, station, volunteer_id, event_id
 */
shiftRouter.put('', async (req, res) => {

   const {new_id, role, start_time, end_time, station, volunteer_id, event_id} = req.body;

   Shift.addShift(new_id, role, start_time, end_time, station, volunteer_id, event_id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('shift not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
});

shiftRouter.delete('/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   Shift.deleteShift(id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('shift not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
});


export default shiftRouter;


