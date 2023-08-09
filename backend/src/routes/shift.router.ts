import { Router } from 'express';
import * as Shift from '../model/shift.model'

export const shiftRouter = Router();

// - Sends a query from the URI:id to the database
// - responds with a tuple of shift on success with status(200)
// - responds with status(404) if query is not in the database
shiftRouter.get('/shiftID/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.get_using_shiftID(id)
   .then((result) => {
      res.status(200).send(result.rows);
      
   })
   .catch((err) => {
      res.status(404).json({message: 'Shift not found', error: err});
   });
}); 


shiftRouter.get('/eventID/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.get_using_eventID(id)
   .then((result) => {
      // let rows: any[] = [];
      // for (let i = 0; i < result.rowCount; i++) {
      //    const row: any[] = [result.rows[i]['shift_id'],   result.rows[i]['role'],
      //                         result.rows[i]['start_time'], result.rows[i]['end_time'], 
      //                         result.rows[i]['station'],    result.rows[i]['volunteer_id']];
      //    rows.push(row);
      // }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(404).json({message: 'Shift not found', error: err});
   });
}); 

shiftRouter.get('/organizerID/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.get_using_organizerID(id)
   .then((result) => {
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(404).json({message: 'Shift not found', error: err});
   });
}); 

shiftRouter.get('/volunteerID/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Shift.get_using_volunteerID(id)
   .then((result) => {
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(404).json({message: 'Shift not found', error: err});
   });
}); 

/**
 * Send tuple(s) containing shifts with no volunteer_id
 */
shiftRouter.get('/available', async (req, res) => {
   const city: string = req.query.city as string;
      const province: string = req.query.province as string;
      let type: string;
      let attribute: string;
      if (city !== undefined) {
         type = 'city'
         attribute = city;
      } else {
         type = 'province'
         attribute = province;
      }
   if (req.query.city !== undefined || req.query.province !== undefined) {
      
      Shift.get_using_noID_filter(attribute, type)
      .then((result) => {
         res.status(200).send(result.rows);
      })
      .catch((err) => {
         res.status(404).json({message: 'Shift not found', error: err});
      });
      
   } else {
      Shift.get_using_noID()
      .then((result) => {
         res.status(200).send(result.rows);
      })
      .catch((err) => {
         res.status(404).json({message: 'Shift not found', error: err});
      });
   }
   
});





/**
 * updates all attributes in shift given the initial shift_id in the URI
 * Attributes to be changed are passed through req.body and they must 
 * include: role, start_time, end_time, station
 */
shiftRouter.post('/update/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   const {role, start_time, end_time, volunteer_id, station} = req.body;

   Shift.updateShift(id,role, start_time, end_time, station, volunteer_id)
   .then((result) => {
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(404).json({message: 'Shift not found', error: err});
   });
}); 

shiftRouter.post('/accept/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   const {volunteer_id} = req.body;
   Shift.acceptShift(id,volunteer_id)
   .then((result) => {
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(404).json({message: 'Shift not found', error: err});
   });
}); 

shiftRouter.post('/drop/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   Shift.dropShift(id)
   .then((result) => {
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(404).json({message: 'Shift not found', error: err});
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
      res.status(404).json({message: 'Shift not found', error: err});
   });
});

shiftRouter.delete('/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   Shift.deleteShift(id)
   .then((result) => {

      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(404).json({message: 'Shift not found', error: err});
   });
});


export default shiftRouter;
