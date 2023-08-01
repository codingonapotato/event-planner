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