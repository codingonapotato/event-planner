import * as db from "../../db";

export async function findUser(id: number) {
    const res = await db.query(`SELECT * FROM volunteer WHERE volunteer_id = $1`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

// @todo waiting for unit 5 to learn how to write this query properly
export async function findEvents(id: number) {
    const res = await db.query(`SELECT event_id FROM volunteers_for_event`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}


export async function findShifts(id: number) {
    const res = await db.query(`SELECT * FROM volunteer WHERE volunteer_id = $1`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

export async function findHoursVolunteered(id: number) {
    const res = await db.query(`SELECT hours_volunteered FROM volunteer WHERE volunteer_id = $1`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows[0];
    }
}