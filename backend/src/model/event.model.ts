import * as db from "../../db";
import * as Venue from "./venue.model"

export function findEvent(id: number) {
    return db.query(`SELECT 
    name,
    start_time,
    end_time,
    street_num,
    street,
    postal_code
    FROM event WHERE event_id = $1`, [id]);
}

export async function findEventByCity(city: string) {
    const res = await db.query(`SELECT
        name,
        start_time,
        end_time,
        street_num,
        street,
        postal_code,
        city,
        province
        FROM event NATURAL JOIN city NATURAL JOIN province
        WHERE city ILIKE $1 || '%'`, [city]);
        return res.rows;
}

export async function findEventByProvince(province: string) {
    const res = await db.query(`SELECT
        name,
        start_time,
        end_time,
        street_num,
        street,
        postal_code,
        city,
        province
        FROM event NATURAL JOIN city NATURAL JOIN province
        WHERE province = $1`, [province]);
    return res.rows;
}

export async function createEvent(params: any[], locationInfo: any[]) {
    console.log(params);


    await Venue.addVenue(locationInfo);
    const res = await db.query(`
        INSERT INTO event(name, start_time, end_time, visibility, budget, organizer_id, street_num, street, postal_code)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *
    `, params.slice(0,9));

    return res;
}


export async function getUpcomingEvents(user_id: number) {
    const res = await db.query(`SELECT
        name,
        start_time,
        end_time,
        street_num,
        street,
        postal_code,
        city,
        province,
        tier_description
        FROM event NATURAL JOIN city NATURAL JOIN province NATURAL JOIN ticket NATURAL JOIN tier
        WHERE customer_id = $1`, [user_id]);
    return res.rows;
}

export async function deleteEvent(event_id: number): Promise<boolean> {
    const res = await db.query(`DELETE FROM event WHERE event_id = $1 RETURNING *`, [event_id])
    return (res.rows.length === 1);
};