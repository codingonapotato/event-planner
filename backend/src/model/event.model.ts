import * as db from "../../db";
import * as Customer from './customer.model'
import * as Venue from "./venue.model"
import * as Ticket from "./ticket.model"

export async function findEvent(id: number) {
    const res = await db.query(`SELECT 
    name,
    start_time,
    end_time,
    visibility,
    budget,
    street_num,
    street,
    postal_code,
    city,
    province
    FROM event NATURAL JOIN city NATURAL JOIN province
    WHERE event_id = $1`, [id]);

    return res.rows[0];
}

export async function findAllPublicEvents() {
    const res = await db.query(`SELECT * FROM event NATURAL JOIN city NATURAL JOIN province WHERE visibility = 'public'`, []);
    return res;
}

export async function updateEvent(params: any[], locationInfo: any[]) {
    await Venue.addVenue(locationInfo);
    const res = await db.query(`
        UPDATE event SET
        name = $1,
        start_time = $2,
        end_time = $3,
        visibility = $4,
        budget = $5,
        street_num = $6,
        street = $7,
        postal_code = $8
        WHERE event_id = $9
        RETURNING *`, params);

    return res.rows[0];
}

export async function findEventByCity(city: string) {
    console.log('I ran')
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
    console.log('Running!')
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
        event_id,
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
        `SELECT DISTINCT tier_id, tier_name, tier_description, price
    FROM ticket NATURAL JOIN tier
    WHERE event_id = $1`, [eventId]);
    return res.rows;
}

/**  EFFECTs: If there is ticket w/o a customer_id = @param cid, and supposing the customer has a non-negative balance after purchase,
 * this function handles the ticket purchase associated 
*/
export async function handlePurchase(arr) {
    // console.log(arr);
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
    console.log(totalTickets)

    const eventVenueKey = await db.query(`SELECT street, street_num, postal_code FROM event WHERE event_id = $1`, [event])
    street = eventVenueKey.rows[0].street
    street_num = eventVenueKey.rows[0].street_num
    postal_code = eventVenueKey.rows[0].postal_code
    // console.log(`${street} ${postal_code} ${street_num}`)

    const ticketQuery = await getEventTicketInfo(event);
    console.log(ticketQuery)
    const { tickets_for_sale } = ticketQuery[0]
    console.log(tickets_for_sale)

    if (totalTickets > tickets_for_sale) {
        return -1; // disallow operation
    } else {
        if (await Customer.deductBalance(user, totalPrice) != -1) {
            arr.forEach((e) => {
                for (let i = 0; i < e.number; i++) {
                    Ticket.buyTicket(user, event, e.tier_id);
                }
            })
            return 1; // Completed successfully
        } else {
            return -1; // user is broke
        }
    }
}

export async function createEvent(params: any[], locationInfo: any[]) {
    console.log(params);

    await Venue.addVenue(locationInfo);
    const res = await db.query(`
        INSERT INTO event(name, start_time, end_time, visibility, budget, organizer_id, street_num, street, postal_code)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *
    `, params);

    return res;
}

export async function createEventTickets(numTickets: number, tier_id: number, event_id: number, seat_start: number) {
    const ret = [];
    for (let i = 0; i < numTickets; i++) {
        await Ticket.createTicket({ seat_number: seat_start + i, tier_id: tier_id, event_id: event_id }).then(res => {
            if (res === -1) {
                ret.push({ err: `Creation of ticket sent with request ${i} failed due to seat conflict on seat ${seat_start + i}` })
            } else {
                ret.push(res);
            }
        }, err => {
            ret.push({ err: `Creation of ticket sent with request ${i} failed with error ${err}` });
        });
    }
    return ret;
}

export async function getUpcomingEvents(user_id: number) {
    const res = await db.query(`
        SELECT 
        event_id,
        name,
        start_time,
        end_time,
        street_num,
        street,
        postal_code,
        city,
        province,
        COUNT(*) AS count
        FROM event NATURAL JOIN city NATURAL JOIN province NATURAL JOIN ticket NATURAL JOIN tier
        WHERE customer_id = $1 AND start_time >= (SELECT NOW())
        GROUP BY event_id, name, start_time, end_time, street_num, street, postal_code, city, province
        ORDER BY start_time`, [user_id]);
    return res.rows;
}

export async function deleteEvent(event_id: number): Promise<boolean> {
    const res = await db.query(`DELETE FROM event WHERE event_id = $1 RETURNING *`, [event_id])
    return (res.rows.length === 1);
};

// Retrieve revenue for each event organized by given organizer; retrieves result only if event has revenue
export async function getAllRevenue(organizer_id: number) {
    const res = await db.query(`
        SELECT name AS event_name, sum(tiersum) AS event_revenue
        FROM event NATURAL JOIN (
        	SELECT event_id, SUM(price) AS tiersum
        	FROM ticket NATURAL JOIN tier
        	WHERE customer_id IS NOT NULL AND organizer_id=$1
        	GROUP BY event_id
        ) AS tiersumtable
        GROUP BY event_id
        HAVING organizer_id=$1
    `, [organizer_id]);

    return res.rows;
}

// Retrieves total revenue for all events that the organizer has organized 
export async function getTotalRevenue(organizer_id: number) {
    const res = await db.query(`
        SELECT SUM(price) AS total_revenue
        FROM ticket NATURAL JOIN tier
        WHERE customer_id IS NOT NULL AND organizer_id=$1
    `, [organizer_id]);

    return res.rows[0];
}

export async function getTotalTickets(organizer_id: number) {
    const res = await db.query(`
        SELECT COUNT(*) AS ticket_count
        FROM ticket NATURAL JOIN event
        WHERE customer_id IS NOT NULL AND organizer_id = $1 
    `, [organizer_id]);

    return res.rows[0];
}

export async function getManagedEventCount(organizer_id: number) {
    const res = await db.query(`
        SELECT COUNT(*) AS event_count
        FROM event
        WHERE organizer_id = $1
    `, [organizer_id]);

    return res.rows[0];
}

export async function getHighestRevenue(organizer_id: number) {
    const res = await db.query(`
        SELECT MAX(event_revenue::numeric)::money AS max_revenue
        FROM (
        	SELECT event_id, SUM(tier_revenue) AS event_revenue
        	FROM (
        		SELECT tier_id, event_id, SUM(price) AS tier_revenue
        		FROM ticket NATURAL JOIN tier NATURAL JOIN event
        		WHERE customer_id IS NOT NULL AND organizer_id = $1
        		GROUP BY tier_id, event_id
        	) AS tier_revenues
        	GROUP BY event_id
        ) event_revenues
    `, [organizer_id])

    return res.rows[0];
}

// Retrieves ticket information for a given evnet
export async function getEventTicketInfo(event_id: number) {
    const res = await db.query(`
        SELECT tier_id, name, tier_name, 
        COUNT(*) FILTER (WHERE customer_id IS NULL) AS tickets_for_sale,
        COUNT(*) FILTER (WHERE customer_id IS NOT NULL) AS sold_tickets
        FROM ticket NATURAL JOIN tier NATURAL JOIN event
        WHERE event_id = $1
        GROUP BY tier_id, name, tier_name
    `, [event_id]);

    return res.rows;
}

export async function getManagedEvents(organizer_id: number) {
    const res = await db.query(`
        SELECT 
        event_id,
        name,
        start_time,
        end_time,
        budget,
        street_num,
        street,
        postal_code,
        city,
        province
        FROM event NATURAL JOIN organizer NATURAL JOIN city NATURAL JOIN province
        WHERE organizer_id = $1
    `, [organizer_id]);

    return res;
}
