import * as db from "../../db";

export function findEvent(id: number) {
    return db.query(`SELECT 
    start_time,
    end_time,
    street_num,
    street,
    postal_code
    FROM event WHERE event_id = $1`, [id]);
}

export async function findEventByCity(city: string) {
    const res = await db.query(`SELECT
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

export async function createEvent(params: any[]) {


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
    const res = await db.query(`DELETE FROM events WHERE event_id = $1`, [event_id])
    return (res.rows.length === 1);
};