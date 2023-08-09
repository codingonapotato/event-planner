import * as db from "../../db";
import * as User from "./user.model"

/**EFFECTS: Checks for existence of customer with @param id and if the user is a customer, then retrieve
 * their data. Otherwise, return 'Customer not found' or handle errors.
 */
export async function findUser(id: number) {
    const res = await db.query(`SELECT * FROM customer WHERE customer_id = $1`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return User.findUser(id);
    }
}

/** EFFECTS: Retrieves all dependants associated to a customer with id=@param id */
export async function getDependant(id: number) {
    const res = await db.query(`SELECT * FROM dependants WHERE customer_id = $1`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

/** EFFECTS: Adds a new dependant associated to a customer with id=@param id */
export async function addDependant(id: number, req) {
    const { first_name: firstName, last_name: lastName, birthdate } = req.body;
    const res = await db.query(`INSERT INTO dependants VALUES ($1, $2, $3, $4) RETURNING *`,
        [firstName, lastName, id, birthdate]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

/** EFFECTS: Handles logic of deducting balance of customer with @param id for @param amt
 * returns @returns remaining balance regardless of sign
*/
export async function deductBalance(id: number, amt: number) {
    const res = await db.query(`SELECT balance FROM users WHERE user_id = $1`, [id]);
    let balance = res.rows[0].balance;
    balance = balance.replace(/\$/g, '');
    balance = balance.replace(/,/g, '');
    balance = parseFloat(balance);

    const remaining = balance - amt;
    // console.log(balance)
    // console.log(amt)
    if (remaining < 0) {
        return -1;
    } else {
        await db.query(`UPDATE users SET balance = $2 WHERE user_id = $1`, [id, remaining]);
        return 1;
    }
}

/** EFFECTS: Handles logic of adding balance to customer with  @param id for @param amt*/
export async function addBalance(id: number, amt: number) {
    const res = await db.query(`SELECT balance FROM users WHERE user_id = $1`, [id]);
    const balance = parseFloat(res.rows[0]);

    const remaining = balance + amt;
    db.query(`UPDATE users SET balance = $2 WHERE user_id = $1`, [id, remaining]);
}

/** EFFECTS: Modifies a new dependant associated to a customer with id=@param id */
export async function modifyDependant(id: number, req) {
    const { first_name: firstName, last_name: lastName } = req.params;
    const { first_name: newFirstName, last_name: newLastName, birthdate } = req.body;
    const res = await db.query(`UPDATE dependants SET 
        first_name = $1,
        last_name = $2,
        customer_id = $3,
        birthdate = $4 
        WHERE customer_id = $3 AND first_name = $5 AND last_name = $6 
        RETURNING *`, [newFirstName, newLastName, id, birthdate, firstName, lastName]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

/** EFFECTS: Rempoves a new dependant associated to a customer with id=@param id */
export async function removeDependant(id: number, req) {
    const { first_name: firstName, last_name: lastName } = req.body;
    const res = await db.query(`DELETE FROM dependants 
        WHERE customer_id = $1 AND first_name = $2 AND last_name = $3
        RETURNING *`, [id, firstName, lastName]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

/** EFFECTS: Retrieves all tickets that a customer holds (including information on the event the ticket is for) */
export async function findTickets(id: number) {
    const res = await db.query(`SELECT DISTINCT *
    FROM ticket t, event e, organizer o, tier ti
    WHERE t.customer_id = $1 AND t.event_id = e.event_id AND t.tier_id = ti.tier_id AND e.organizer_id = o.organizer_id`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}