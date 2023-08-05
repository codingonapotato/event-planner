import * as db from "../../db";
import { makeCustomer } from "./user.model";

// Might need joins here to get all the infromation about the tier and event the ticket is for mmm
export async function findTicket(id: number) {
    const res = await db.query('SELECT * FROM ticket WHERE ticket_id = $1', [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

export async function modifyTicket(id: number, req) {
    const { seat_number: seatNumber, tier_id: tierId, event_id: eventId, customer_id: customerId } = req.body
    const res = await db.query(`UPDATE ticket SET 
    seat_number = $2,
    tier_id = $3,
    event_id = $4,
    customer_id = $5
    WHERE ticket_id = $1
    RETURNING *`, [id, seatNumber, tierId, eventId, customerId]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

export async function buyTicket(customer_id: number, event_id: number, tier_id: number) {
    const res = await makeCustomer(customer_id).then(async result => {
        const res = await db.query(`
        UPDATE ticket SET
        customer_id = $1 
        WHERE ticket_id IN (
            SELECT ticket_id
            FROM ticket NATURAL JOIN tier
            WHERE customer_id IS NULL AND event_id = $2 AND tier_id = $3
            ORDER BY ticket_id LIMIT 1
        ) 
        RETURNING *`, [customer_id, event_id, tier_id]);
        return res.rows[0];
    }, err => {
        console.log(err)
    });

    return res;
}

export async function createTicket(params: any) {
    const { seat_number = null, tier_id, event_id, customer_id = null} = params;
    const res = await db.query(`
        INSERT INTO ticket (seat_number, tier_id, event_id, customer_id) 
        VALUES ($1, $2, $3, $4) 
        ON CONFLICT DO NOTHING 
        RETURNING *`,
        [seat_number, tier_id, event_id, customer_id]);
    // console.log(res);
    if (res.rows.length === 0) {
        return -1;
    } else {
        // console.log(res.rows[0]);
        return res.rows[0];
    }
}

export async function removeTicket(id: number) {
    const res = await db.query(`DELETE FROM ticket WHERE ticket_id = $1 RETURNING *`, [id])
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

/** EFFECTS: Returns the tier for the ticket with @param ticketId */
export async function findTier(ticketId: number) {
    const res = await db.query(`SELECT * FROM ticket t, tier ti
    WHERE t.ticket_id = $1 AND t.tier_id = ti.tier_id`, [ticketId])
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}