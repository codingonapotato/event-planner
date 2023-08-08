import * as db from "../../db";
import * as Customer from './customer.model'

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

export async function findAllPublicEvents() {
    const res = await db.query(`SELECT * FROM event NATURAL JOIN city NATURAL JOIN province`, []);
    return res;
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

// Guaranteed that both are not null or undefined since checked in the router
export async function findEventByCityAndProvince(city: string, province: string) {
    const res = await db.query(`SELECT name,
        start_time,
        end_time,
        street_num,
        street,
        postal_code,
        city,
        province
        FROM event NATURAL JOIN city NATURAL JOIN province
        WHERE city ILIKE $1 || '%' AND province = $2`, [city, province]);
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

export async function findTiersForEvent(eventId: number) {
    const res = await db.query(
        `SELECT tier_id, tier_name, tier_description, price
    FROM tier
    WHERE event_id = $1`, [eventId]);
    return res.rows;
}

/**  EFFECTs: If there is ticket w/o a customer_id = @param cid, and supposing the customer has a non-negative balance after purchase,
 * this function handles the ticket purchase associated 
*/
export async function handlePurchase(arr) {
    const user = arr[0].user_id;
    const event = arr[0].event_id;
    const totalPrice = arr[0].total_price;
    let totalTickets = 0;
    let street = '';
    let street_num = '';
    let postal_code = '';

    arr.forEach((e) => {
        totalTickets += e.number;
    })
    // console.log(totalTickets)

    const eventVenueKey = await db.query(`SELECT street, street_num, postal_code FROM event WHERE event_id = $1`, [event])
    street = eventVenueKey.rows[0].street
    street_num = eventVenueKey.rows[0].street_num
    postal_code = eventVenueKey.rows[0].postal_code
    // console.log(`${street} ${postal_code} ${street_num}`)

    const venueQuery = await db.query(`SELECT capacity FROM venue WHERE street = $1 AND street_num = $2 AND postal_code = $3`, [street, street_num, postal_code])
    const capacity = parseInt(venueQuery.rows[0].capacity);

    const ticketQuery = await db.query(`SELECT Count(*) FROM ticket`, [])
    const ticketSold = ticketQuery.rows[0].count;
    console.log(ticketSold)

    if (ticketSold + totalTickets > capacity) {
        return -1; // disallow operation
    } else {
        arr.forEach((e) => {

        })
    }
    return -1; // stub
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