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
    const avgRevenue = await Event.getHighestRevenue(organizer_id);
    const eventsManaged = await Event.getManagedEventCount(organizer_id);

    return {...totalRevenue, ...totalTickets, ...avgRevenue, ...eventsManaged };
}