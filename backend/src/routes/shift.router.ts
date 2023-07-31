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



// shiftRouter.post('/role/:id/:role', async (req, res) => {
//    const id = parseInt(req.params.id);
//    const role = req.params.role.toString();
//    Shift.updateRole(id,role)
//    .then((result) => {
//       if (result.rowCount === 0) {
//          res.status(404).send('shift not found') 
//       }
//       res.status(200).send(result.rows);
//    })
//    .catch((err) => {
//       res.status(500).send('Database query failed');
//    });
// }); 

// shiftRouter.post('/startTime/:id/:startTime', async (req, res) => {
//    const id = parseInt(req.params.id);
//    const startTime = req.params.startTime.toString();
//    Shift.updateStartTime(id,startTime)
//    .then((result) => {
//       if (result.rowCount === 0) {
//          res.status(404).send('shift not found') 
//       }
//       res.status(200).send(result.rows);
//    })
//    .catch((err) => {
//       res.status(500).send('Database query failed');
//    });
// }); 

// shiftRouter.post('/endTime/:id/:endTime', async (req, res) => {
//    const id = parseInt(req.params.id);
//    const endTime = req.params.endTime.toString();
//    Shift.updateStartTime(id,endTime)
//    .then((result) => {
//       if (result.rowCount === 0) {
//          res.status(404).send('shift not found') 
//       }
//       res.status(200).send(result.rows);
//    })
//    .catch((err) => {
//       res.status(500).send('Database query failed');
//    });
// });

// shiftRouter.post('/station/:id/:station', async (req, res) => {
//    const id = parseInt(req.params.id);
//    const station = req.params.station.toString();
//    Shift.updateStartTime(id,station)
//    .then((result) => {
//       if (result.rowCount === 0) {
//          res.status(404).send('shift not found') 
//       }
//       res.status(200).send(result.rows);
//    })
//    .catch((err) => {
//       res.status(500).send('Database query failed');
//    });
// });

// shiftRouter.post('/id/:id/:new_id', async (req, res) => {
//    const id = parseInt(req.params.id);
//    const new_id = parseInt(req.params.new_id);
//    Shift.updateSID(id,new_id)
//    .then((result) => {
//       if (result.rowCount === 0) {
//          res.status(404).send('shift not found') 
//       }
//       res.status(200).send(result.rows);
//    })
//    .catch((err) => {
//       res.status(500).send('Database query failed');
//    });
// });

shiftRouter.put('/:id/:role/:startTime/:endTime/:station/:volunteer_id/:event_id', async (req, res) => {
   const id          = parseInt(req.params.id);
   const role        = req.params.role.toString();
   const startTime   = req.params.startTime.toString();
   const endTime     = req.params.endTime.toString();
   const station     = req.params.station.toString();
   const volunteer_id= parseInt(req.params.volunteer_id);
   const event_id    = parseInt(req.params.event_id);

   Shift.addShift(id,role,startTime,endTime,station,volunteer_id,event_id)
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


