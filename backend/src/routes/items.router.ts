import { Router } from 'express';
import * as Items from '../model/items.model'

export const itemsRouter = Router();

// - Sends a query from the URI:id to the database
// - responds with a tuple of shift on success with status(200)
// - responds with status(404) if query is not in the database
// - responds with status(500) if the query fails otherwise
itemsRouter.get('/item/:id', async (req, res) => {
    const id = parseInt(req.params.id);
 
    Items.get_using_itemID(id)
    .then((result) => {
       if (result.rowCount === 0) {
          res.status(404).send('Item not found') 
       }
       res.status(200).send(result.rows);
    })
    .catch((err) => {
       res.status(500).send('Database query failed');
    });
 }); 
 
 /**
  * Give the id of the item in the URI, change its attribtes listed in request body
  * Request body must contain: amount, item_name
  */
 itemsRouter.post('/item/:id', async (req, res) => {
   const id = parseInt(req.params.id);
   const {amount, item_name} = req.body;

   Items.update_item(id, amount, item_name)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

//  itemsRouter.post('/id/:id/:new_id', async (req, res) => {
//    const id = parseInt(req.params.id);
//    const new_id = parseInt(req.params.new_id);

//    Items.update_item_id(id,new_id)
//    .then((result) => {
//       if (result.rowCount === 0) {
//          res.status(404).send('Item not found') 
//       }
//       res.status(200).send(result.rows);
//    })
//    .catch((err) => {
//       res.status(500).send('Database query failed');
//    });
// }); 

// itemsRouter.post('/amount/:id/:amount', async (req, res) => {
//    const id = parseInt(req.params.id);
//    const amount = parseInt(req.params.amount);

//    Items.update_amount(id,amount)
//    .then((result) => {
//       if (result.rowCount === 0) {
//          res.status(404).send('Item not found') 
//       }
//       res.status(200).send(result.rows);
//    })
//    .catch((err) => {
//       res.status(500).send('Database query failed');
//    });
// }); 

// itemsRouter.post('/item_name/:id/:item_name', async (req, res) => {
//    const id = parseInt(req.params.id);
//    const item_name = req.params.item_name.toString();

//    Items.update_item_name(id,item_name)
//    .then((result) => {
//       if (result.rowCount === 0) {
//          res.status(404).send('Item not found') 
//       }
//       res.status(200).send(result.rows);
//    })
//    .catch((err) => {
//       res.status(500).send('Database query failed');
//    });
// }); 

itemsRouter.put('/item', async (req, res) => {
   const {amount, item_name} = req.body;

   Items.add_item(amount,item_name)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

itemsRouter.delete('/item/:id', async (req, res) => {
   const id = parseInt(req.params.id);

   Items.delete_item(id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
});






itemsRouter.get('/belongs/:street_num/:street/:postal_code/:item_id', async (req, res) => {
   const street_num = parseInt(req.params.street_num);
   const street = req.params.street.toString();
   const postal_code = req.params.postal_code.toString();
   const item_id = parseInt(req.params.item_id);

   Items.get_belongs(street_num, street, postal_code, item_id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

/**
 * Updates the location in the belongs relation. Keys go in URI while venue_location must be
 * included in request body
 */
itemsRouter.post('/belongs/:street_num/:street/:postal_code/:item_id', async (req, res) => {
   const street_num = parseInt(req.params.street_num);
   const street = req.params.street.toString();
   const postal_code = req.params.postal_code.toString();
   const item_id = parseInt(req.params.item_id);

   const venue_location = req.body.venue_location.toString();
   // const {street_num, street, postal_code, item_id, venue_location} = req.body

   Items.update_belongs(street_num, street, postal_code, item_id,venue_location)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 


itemsRouter.put('/belongs', async (req, res) => {
   const {street_num, street, postal_code, item_id, venue_location} = req.body

   Items.add_belongs(street_num, street, postal_code, item_id, venue_location)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

itemsRouter.delete('/belongs/:street_num/:street/:postal_code/:item_id', async (req, res) => {
   const street_num = parseInt(req.params.street_num);
   const street = req.params.street.toString();
   const postal_code = req.params.postal_code.toString();
   const item_id = parseInt(req.params.item_id);

   Items.delete_belongs(street_num,street,postal_code,item_id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
});




itemsRouter.get('/contributes/:contrib_user_id', async (req, res) => {
   const contrib_user_id = parseInt(req.params.contrib_user_id);

   Items.get_contributions_user(contrib_user_id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

/**
 * Updates the contributes attributes. contrib_user_id and item_id goes in URI while 
 * contrib_start_time, contrib_end_time, contrib_amt must be included in request body
 */
itemsRouter.post('/contributes/:contrib_user_id/:item_id', async (req, res) => {
   const contrib_user_id = parseInt(req.params.contrib_user_id);
   const item_id = parseInt(req.params.item_id);

   const new_contrib_user_id = req.body.contrib_user_id;
   const new_item_id = req.body.item_id;
   const {contrib_start_time, contrib_end_time, contrib_amt} = req.body;

   Items.update_contributions(contrib_user_id,item_id,new_contrib_user_id, new_item_id,
      contrib_start_time, contrib_end_time, contrib_amt)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 


itemsRouter.put('/contributes', async (req, res) => {
   const {contrib_user_id, item_id, contrib_start_time, 
      contrib_end_time, contrib_amt} = req.body;

   Items.add_contributions(contrib_user_id, item_id, contrib_start_time, 
      contrib_end_time, contrib_amt)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

itemsRouter.delete('/contributes/:contrib_user_id/:item_id', async (req, res) => {
   const contrib_user_id = parseInt(req.params.contrib_user_id);
   const item_id = parseInt(req.params.item_id);

   Items.delete_contributes(contrib_user_id,item_id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
});





itemsRouter.get('/requests/:req_user_id', async (req, res) => {
   const req_user_id = parseInt(req.params.req_user_id);

   Items.get_request_requester(req_user_id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

/**
 * Updates the contributes attributes. contrib_user_id and item_id goes in URI while 
 * contrib_start_time, contrib_end_time, contrib_amt must be included in request body
 */
itemsRouter.post('/requests/:req_user_id/:item_id', async (req, res) => {
   const req_user_id = parseInt(req.params.req_user_id);
   const item_id = parseInt(req.params.item_id);

   const new_req_user_id = req.body.req_user_id;
   const new_item_id = req.body.item_id;
   const req_amt = req.body.req_amt;

   Items.update_request(req_user_id, item_id, new_req_user_id, new_item_id, req_amt)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 


itemsRouter.put('/requests', async (req, res) => {
   const {req_user_id, item_id, req_amt} = req.body;

   Items.add_request(req_user_id, item_id, req_amt)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
}); 

itemsRouter.delete('/requests/:req_user_id/:item_id', async (req, res) => {
   const req_user_id = parseInt(req.params.req_user_id);
   const item_id = parseInt(req.params.item_id);

   Items.delete_request(req_user_id,item_id)
   .then((result) => {
      if (result.rowCount === 0) {
         res.status(404).send('Item not found') 
      }
      res.status(200).send(result.rows);
   })
   .catch((err) => {
      res.status(500).send('Database query failed');
   });
});


export default itemsRouter;
