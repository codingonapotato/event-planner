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

// export async function createTicket(id: number, req) {
//     const { } = req.body;
//     const res = await db.query(`INSERT INTO dependants VALUES ($1, $2, $3, $4) RETURNING *`,
//         [firstName, lastName, id, birthdate]);
//     if (res.rows.length === 0) {
//         return -1;
//     } else {
//         return res.rows;
//     }
// }