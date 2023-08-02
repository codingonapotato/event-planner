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
      const info: any[] = [result.rows[0]['role'],          result.rows[0]['start_time'], 
                           result.rows[0]['end_time'],      result.rows[0]['station'], 
                           result.rows[0]['volunteer_id'],  result.rows[0]['event_id']];

      res.status(200).send(info);
      
   })
   .catch((err) => {
      res.status(401).json({message: 'Shift not found', error: err});
   });
}); 

shiftRouter.get('/eventID/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.get_using_eventID(id)
   .then((result) => {
      const info: any[] = [result.rows[0]['shift_id'],   result.rows[0]['role'],
                           result.rows[0]['start_time'], result.rows[0]['end_time'], 
                           result.rows[0]['station'],    result.rows[0]['volunteer_id']];

      res.status(200).send(info);
   })
   .catch((err) => {
      res.status(401).json({message: 'Shift not found', error: err});
   });
}); 

shiftRouter.get('/volunteerID/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.get_using_volunteerID(id)
   .then((result) => {
      const info: any[] = [result.rows[0]['shift_id'],   result.rows[0]['role'],
                           result.rows[0]['start_time'], result.rows[0]['end_time'], 
                           result.rows[0]['station'],    result.rows[0]['event_id']];

      res.status(200).send(info);
   })
   .catch((err) => {
      res.status(401).json({message: 'Shift not found', error: err});
   });
}); 

/**
 * updates all attributes in shift given the initial shift_id in the URI
 * Attributes to be changed are passed through req.body and they must 
 * include: role, start_time, end_time, station
 */
shiftRouter.post('/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   const {new_id, role, start_time, end_time, station} = req.body;

   Shift.updateShift(id,role, start_time, end_time, station)
   .then((result) => {

      // console.log(`command:: ${result.command}`);
      // console.log(`fields: ${result.fields}`);
      // console.log(`oid: ${result.oid}`);
      // console.log(`rowCount: ${result.rowCount}`);
      // console.log(`rows: ${result.rows}`);

      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(401).json({message: 'Shift not found', error: err});
   });
}); 

/**
 * Creates a new shift using info from request body
 * The request body must contain the following fields:
 * role, start_time, end_time, station, volunteer_id, event_id
 */
shiftRouter.put('', async (req, res) => {

   const {role, start_time, end_time, station, volunteer_id, event_id} = req.body;

   Shift.addShift(role, start_time, end_time, station, volunteer_id, event_id)
   .then((result) => {
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(401).json({message: 'Shift not found', error: err});
   });
});

shiftRouter.delete('/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   Shift.deleteShift(id)
   .then((result) => {

      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(401).json({message: 'Shift not found', error: err});
   });
});


export default shiftRouter;
