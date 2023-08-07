import * as db from "../../db";

// returns a query containing the row of the shift specified by [id: number]
export function get_using_shiftID(id: number) {
    return db.query(`SELECT role, start_time, end_time, station, volunteer_id, event_id, organizer_id 
    FROM shift WHERE shift_id = $1::integer`, [id]);
}


// returns a query containing the row of the shift specified by [id: number]
export function get_using_eventID(id: number) {
    return db.query(`SELECT shift_id, role, start_time, end_time, station, volunteer_id, organizer_id
    FROM shift WHERE event_id = $1::integer`, [id]);
}
 

export function get_using_organizerID(id: number) {
    return db.query(
        `SELECT * 
        FROM shift 
        WHERE organizer_id = $1::integer`
    , [id]);
}

export function get_using_volunteerID(id: number) {
    return db.query(`SELECT shift_id, role, start_time, end_time, station, event_id, organizer_id 
    FROM shift WHERE volunteer_id = $1::integer`, [id]);
}

export function get_using_noID() {
    return db.query(`SELECT shift_id, role, start_time, end_time, station, event_id, organizer_id 
    FROM shift WHERE volunteer_id IS NULL`,[]);
}

export async function get_using_noID_city(city: string) {
    return db.query(`
    SELECT shift_id, role, start_time, end_time, station, event_id, organizer_id 
    FROM shift s 
    WHERE volunteer_id IS null AND event_id IN 
        (SELECT event_id 
        FROM event NATURAL JOIN city NATURAL JOIN province 
        WHERE city ILIKE $1 || '%')`, [city]);
}

/**
 * Updates attributes with the exception of foreign keys in Shift
 * @param id the shift_id of the shift we want to change
 * @param role 
 * @param startTime 
 * @param endTime 
 * @param station 
 * @returns promise to a query result
 */
export function updateShift(id: number, role: string, startTime: string, 
    endTime: string, station: string, volunteer_id: any) {
    if (volunteer_id === null || volunteer_id == '') {
        return db.query(`UPDATE shift SET role = $2::text, start_time = $3::timestamp, 
        end_time = $4::timestamp, station = $5::text, volunteer_id = null WHERE shift_id = $1::integer;`, 
        [id, role, startTime, endTime, station]);    
    }
    return db.query(`UPDATE shift SET role = $2::text, start_time = $3::timestamp, 
        end_time = $4::timestamp, station = $5::text, volunteer_id = $6::integer WHERE shift_id = $1::integer;`, 
        [id, role, startTime, endTime, station, volunteer_id]);
}

export function acceptShift(id: number, volunteer_id: number) {
    return db.query(`UPDATE shift SET volunteer_id = $1::integer WHERE shift_id = $2::integer;`, 
        [volunteer_id, id]);
}


export function dropShift(id: number) {
    return db.query(`UPDATE shift SET volunteer_id = null WHERE shift_id = $1::integer;`, 
        [id]);
}

/**
 * adds a new shift detailed by the parameters
 * @param role 
 * @param startTime 
 * @param endTime 
 * @param station 
 * @param volunteer_id 
 * @param event_id 
 * @returns promise to a QueryResult
 */
export function addShift(role: string, startTime: string, 
    endTime: string, station: string, volunteer_id: any, event_id: number, organizer_id: number) {
    
    if (volunteer_id === null || volunteer_id == '') {
        return db.query(`INSERT INTO shift(role, start_time, end_time, station, volunteer_id, 
            event_id, organizer_id) VALUES ($1::text, $2::timestamp, 
            $3::timestamp, $4::text, null, $5::integer, $6::integer);`, 
            [role, startTime, endTime, station, event_id, organizer_id]);
    }

    return db.query(`INSERT INTO shift(role, start_time, end_time, station, volunteer_id, 
        event_id, organizer_id) VALUES ($1::text, $2::timestamp, 
        $3::timestamp, $4::text, $5::integer, $6::integer, $7::integer);`, 
        [role, startTime, endTime, station, volunteer_id, event_id, organizer_id]);
}

// delete the shift associated with [id:number] from the database
export function deleteShift(id: number) {
    return db.query('DELETE FROM shift WHERE shift_id = $1::integer', [id]);
}


