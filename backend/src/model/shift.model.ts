import * as db from "../../db";

// returns a query containing the row of the shift specified by [id: number]
export function get_using_shiftID(id: number) {
    return db.query(`SELECT role, start_time, end_time, station, volunteer_id, event_id 
    FROM shift WHERE shift_id = $1::integer`, [id]);
}


// returns a query containing the row of the shift specified by [id: number]
export function get_using_eventID(id: number) {
    return db.query(`SELECT shift_id, role, start_time, end_time, station, volunteer_id 
    FROM shift WHERE event_id = $1::integer`, [id]);
}

export function get_using_volunteerID(id: number) {
    return db.query(`SELECT shift_id, role, start_time, end_time, station, event_id 
    FROM shift WHERE volunteer_id = $1::integer`, [id]);
}

/**
 * Updates all attributes with the exception of foreign keys in Shift
 * @param id the shift_id of the shift we want to change
 * @param new_id the new id to replace the old shift_id
 * @param role 
 * @param startTime 
 * @param endTime 
 * @param station 
 * @returns promise to a query result
 */
export function updateShift(id: number, new_id: number, role: string, startTime: string, 
    endTime: string, station: string) {
        
    return db.query(`UPDATE shift SET shift_id = $2::SERIAL, role = $3::text, start_time = $4::timestamp, 
        end_time = $5::timestamp, station = $6::text WHERE shift_id = $1::SERIAL;`, 
        [id, new_id, role, startTime, endTime, station]);
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
    endTime: string, station: string, volunteer_id: number, event_id: number) {
    return db.query(`INSERT INTO shift(role, start_time, end_time, station, volunteer_id, 
        event_id) VALUES ($1::text, $2::timestamp, 
        $3::timestamp, $4::text, $5::integer, $6::integer);`, 
        [role, startTime, endTime, station, volunteer_id, event_id]);
}

// delete the shift associated with [id:number] from the database
export function deleteShift(id: number) {
    return db.query('DELETE FROM shift WHERE shift_id = $1::integer', [id]);
}


