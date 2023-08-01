import * as db from "../../db";

export async function getTier(id: number) {
    const req = await db.query('SELECT * FROM tier WHERE tier_id = $1', [id]);

    if (req.rows.length === 0) {
        return -1;
    } else {
        return req.rows;
    }
}

//** EFFECTS: Creates new tier */
export async function createTier(req) {
    const { event_id: eventId, organizer_id: organizerId, tier_description: tierDescription, tier_name: tierName, price } = req.body;
    const res = await db.query(`INSERT INTO tier (event_id, organizer_id, tier_description, tier_name, price) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [eventId, organizerId, tierDescription, tierName, price]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

//** EFFECTS: Creates new tier */
export async function modifyTier(id: number, req) {
    const { event_id: eventId, organizer_id: organizerId, tier_description: tierDescription, tier_name: tierName, price } = req.body;
    const res = await db.query(`UPDATE tier SET
    event_id = $1,
    organizer_id = $2,
    tier_description = $3,
    tier_name = $4,
    price = $5 
    WHERE tier_id = $6
    RETURNING *`, [eventId, organizerId, tierDescription, tierName, price, id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

export async function deleteTier(id: number) {
    const res = await db.query('DELETE FROM tier WHERE tier_id = $1 RETURNING *', [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}