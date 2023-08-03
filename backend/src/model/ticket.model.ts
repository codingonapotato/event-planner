import * as db from "../../db";

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
    ticket_id = $1,
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

export async function createTicket(req) {
    const { seat_number: seatNumber, tier_id: tierId, event_id: eventId, customer_id: customerId } = req.body;
    const res = await db.query(`INSERT INTO ticket (seat_number, tier_id, event_id, customer_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [seatNumber, tierId, eventId, customerId]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
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