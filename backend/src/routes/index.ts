import { Application } from 'express';
import users from './user.router';
import events from './event.router';
import shift from './shift.router';

const mountRoutes = (app: Application) => {
    app.use('/user', users);
    app.use('/event', events);
    app.use('/shift', shift);
}

export default mountRoutes;