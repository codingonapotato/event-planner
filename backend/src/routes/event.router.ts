import { Router, response } from 'express';
import * as Event from '../model/event.model'


export const eventRouter = Router();

eventRouter.get('/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Event.findEvent(id)
   .then((result) => {
      if (result === undefined) {
         res.status(404).send('event not found') 
      } else {
        res.status(200).send(result);
      }
   })
   .catch((err) => {
      console.log(err);
      res.status(500).send('Database query failed');
   });
}); 


// TODO: add search functionality (search by name)
eventRouter.get('/', async (req, response) => {
   if (req.query.city) {
      const city: string = req.query.city as string;
      Event.findEventByCity(city).then(res => {
         response.status(200).send(res);
      }).catch((err) => {
         console.log(err);
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
      response.status(404).send('No query specified');
   }
});


eventRouter.get('/public/all', (req, response) => {
   Event.findAllPublicEvents().then((res) => {
      response.status(200).send(res.rows)
   })
})


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

eventRouter.put('/', async (req, response) => {
    const { address, start_date, start_time, end_date, end_time } = req.body;
    const startDate = new Date(start_date+'T'+start_time);
    const endDate = new Date(end_date+'T'+end_time);
    const [street_num, street] = address.split(' ', 2);
    const { city, province } = req.body;
    const postal_code = req.body.postal_code.replace(' ', '');
    const params = [req.body.name, startDate, endDate, req.body.visibility, req.body.budget, req.body.organizer_id, street_num, street, postal_code]
    Event.createEvent(params, [street_num, street, postal_code, city, province]).then(res => {
        response.status(200).send(res.rows);
    }, (err) => {
        console.log(err);
        response.status(500).json(err);
    });
});

eventRouter.put('/:id/ticket', async (req, response) => {
   const {numTickets, tier_id, seat_start = null} = req.body;
   const event_id = parseInt(req.params.id);
   Event.createEventTickets(numTickets, tier_id, event_id, seat_start).then(res => {
      response.status(200).send(res);
   }, err => {
      console.log(err);
      response.status(500).json(err);
   })
})

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

eventRouter.get('/revenue/:id', async (req, response) => {
   const organizer_id = parseInt(req.params.id);
   Event.getAllRevenue(organizer_id).then(res => {
      response.status(200).send(res);
   }, err => {
      console.log(err);
      response.status(500).json(err);
   })
})

// eventRouter.get('/totalRevenue/:id', async (req, response) => {
//    const organizer_id = parseInt(req.params.id);
//    Event.getTotalRevenue(organizer_id).then(res => {
//       response.status(200).send(res);
//    }, err => {
//       console.log(err);
//       response.status(500).json(err);
//    })
// })

eventRouter.get('/:id/tickets', async (req, response) => {
   const event_id = parseInt(req.params.id);
   Event.getEventTicketInfo(event_id).then(res => {
      response.status(200).send(res);
   }, err => {
      console.log(err);
      response.status(500).json(err);
   });
});

export default eventRouter;


