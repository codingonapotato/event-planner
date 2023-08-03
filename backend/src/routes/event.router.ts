import { Router, response } from 'express';
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
      console.log(err);
      res.status(500).send('Database query failed');
   });
}); 

// TODO: add search functionality (search by name)
eventRouter.get('/', async (req, response) => {
   if (req.query.city) {
      console.log(req.query.city);
      const city: string = req.query.city as string;
      Event.findEventByCity(city).then(res => {
         response.status(200).send(res);
      }).catch((err) => {
         console.log(err);
         response.status(500).send('Database error')   
      });
   } else if (req.query.province) {
      console.log(req.query.province);
      const province: string = req.query.province as string;
      Event.findEventByProvince(province).then((res) => {
         response.status(200).send(res);
      }).catch((err) => {
         console.log(err);
         response.status(500).send('Database error')   
      });
   } else {
      response.send(404).send('No query specified');
   }
});


// Retrieve upcoming events for user with given id
eventRouter.get('/user/:id', async (req, response) => {
   const user_id = parseInt(req.params.id);
   Event.getUpcomingEvents(user_id).then(res => {
      response.status(200).send(res);
   }).catch(err => {
      console.log(err);
      response.status(500).send('Database error');
   });

});

eventRouter.post('/', async (req, response) => {

});

eventRouter.delete('/:id', async (req, response) => {
   const event_id = parseInt(req.params.id);
   Event.deleteEvent(event_id).then((res) => {
      if (res) {
         response.status(200).send('Deleted event with id ' + event_id);
      } else {
         response.status(401).send('No such event found');
      }
   }).catch(err => {
      console.log(err);
      response.status(500).send('Database error');
   })
})

export default eventRouter;


