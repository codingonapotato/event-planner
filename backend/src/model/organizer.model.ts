import * as db from "../../db";

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
    const res = await db.query(`SELECT e.*, sg.id AS special_guest_id, 
    sg.first_name AS special_guest_first_name, sg.last_name AS special_guest_last_name
    FROM event e, performs p, special_guest sg 
    WHERE e.organizer_id = $1 AND p.event_id = e.event_id AND p.guest_id = sg.id`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}