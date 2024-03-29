import * as db from "../../db";
import * as Event from "./event.model"

/**EFFECTS: Checks for existence of customer with @param id and if the user is a customer, then retrieve
     * their data. Otherwise, return 'Customer not found' or handle errors.
     */
export async function findUser(id: number) {
    const res = await db.query(`SELECT * FROM organizer WHERE organizer_id = $1`, [id])
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

/** Planning to just remove superfluous organizer_id in application code but query returns all*/
export async function findEvents(id: number) {
    const res = await Event.getManagedEvents(id);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

export async function getOrganizerStats(organizer_id: number) {
    const totalRevenue = await Event.getTotalRevenue(organizer_id);
    const totalTickets = await Event.getTotalTickets(organizer_id);
    const returningCustomers = await getReturningCustomers(organizer_id);
    const eventsManaged = await Event.getManagedEventCount(organizer_id);

    return {...totalRevenue, ...totalTickets, ...returningCustomers, ...eventsManaged };
}

export async function getStarVolunteer(organizer_id: number) {
    const res = await db.query(`
    SELECT U.user_id, first_name, last_name
    FROM users U, volunteer V
    WHERE V.volunteer_id = U.user_id AND NOT EXISTS (
        (SELECT E.event_id
        FROM event E
        WHERE E.organizer_id = $1)
        EXCEPT
        (SELECT VE.event_id
        FROM volunteers_for_event VE
        WHERE V.volunteer_id = VE.volunteer_id))
    `, [organizer_id]);

    return res.rows;
}

export async function getStarCustomer(organizer_id: number) {
    const res = await db.query(`
    SELECT U.user_id, first_name, last_name
    FROM users U, customer C
    WHERE C.customer_id = U.user_id AND NOT EXISTS (
        (SELECT E.event_id
        FROM event E
        WHERE E.organizer_id = $1)
        EXCEPT
        (SELECT T.event_id
        FROM ticket T
        WHERE C.customer_id = T.customer_id))
    `, [organizer_id]);

    return res.rows;
}

export async function getReturningCustomers(organizer_id: number) {
    const res = await db.query(`
        SELECT COUNT(*)
        FROM (
            SELECT customer_id
            FROM (
                SELECT customer_id, event_id, COUNT(*)
                FROM ticket NATURAL JOIN event
                WHERE organizer_id=$1
                GROUP BY customer_id, event_id) AS customer_attends_event
            WHERE customer_id IS NOT NULL
            GROUP BY customer_id
            HAVING COUNT(*) > 1) AS returning_customer
    `, [organizer_id]);

    return res.rows[0];
}