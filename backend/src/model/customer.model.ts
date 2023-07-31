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
    const { first_name: firstName, last_name: lastName, birthdate } = req.params;
    const res = await db.query(`INSERT INTO dependants VALUES ($1, $2, $3, $4) RETURNING *`,
        [firstName, lastName, id, birthdate]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }

}

/** EFFECTS: Modifies a new dependant associated to a customer with id=@param id */
export async function modifyDependant(id: number, req) {
    const { first_name: firstName, last_name: lastName, new_first_name: newFirstName, new_last_name: newLastName, birthdate } = req.params;
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
    const { first_name: firstName, last_name: lastName } = req.params;
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
export async function getTickets(id: number) {
    // call event.model function with return eventID maybe?
    return 0; // stub
}