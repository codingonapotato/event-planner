import * as db from "../../db";

export async function findUser(id: number) {
    const res = await db.query(`SELECT * FROM volunteer WHERE volunteer_id = $1`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

// /** Retrieves all events that volunteer with @param id is volunteering for */
// export async function findEvents(id: number) {
//     const res = await db.query(`SELECT v.event_id, v.start_time, v.end_time, v.organizer_first_name, v.organizer_last_name,
//     v.street_num, v.street, v.postal_code 
//     FROM volunteers_for_event ve, volunteer_event v
//     WHERE ve.volunteer_id = $1 AND ve.event_id = v.event_id`, [id]);
//     if (res.rows.length === 0) {
//         return -1;
//     } else {
//         return res.rows;
//     }
// }

/** Retrieves all shifts (and for what event that a volunteer has coming up*/
export async function findShifts(id: number) {
    const res = await db.query(`SELECT s.shift_id, s.role, s.start_time, s.end_time, s.station,
    v.*
    FROM shift s, volunteer_event v
    WHERE s.volunteer_id = $1 AND s.event_id = v.event_id`, [id]);
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