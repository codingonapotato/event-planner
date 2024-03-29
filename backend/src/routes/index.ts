import { Application } from 'express';
import users from './user.router';
import customers from './customer.router'
import organizers from './organizer.router'
import volunteers from './volunteer.router'
import tickets from './ticket.router'
import events from './event.router';
import shift from './shift.router';
import tier from './tier.router';
import items from './items.router';

const mountRoutes = (app: Application) => {
    app.use('/user', users);
    app.use('/customer', customers);
    app.use('/organizer', organizers)
    app.use('/volunteer', volunteers);
    app.use('/ticket', tickets);
    app.use('/tier', tier);
    app.use('/event', events);
    app.use('/shift', shift);
    app.use('/items', items);
}
export default mountRoutes;