import * as db from "../../db";

// returns a query containing the row of the shift specified by [id: number]
export function getShift(id: number) {
    return db.query('SELECT * FROM shift WHERE shift_id = $1::integer', [id]);
}

// updates a shift's ID provided by the old [id: number] and new [new_id: string]
export function updateSID(id: number, new_id: number) {
    return db.query('UPDATE shift SET shift_id = $2::text WHERE shift_id = $1::integer', [id, new_id]);
}

// updates a shift's role provided by [id: number] and [role: string]
export function updateRole(id: number, role: string) {
    return db.query(`UPDATE shift SET role = $2::text WHERE shift_id = $1::integer`, [id, role]);
}

// updates a shift's start time provided by [id: number] and [startTime: string]
export function updateStartTime(id: number, startTime: string) {
    return db.query('UPDATE shift SET start_time = $2::timestamp WHERE shift_id = $1::integer', [id, startTime]);
}

// updates a shift's end time provided by [id: number] and [endTime: string]
export function updateEndTime(id: number, endTime: string) {
    return db.query('UPDATE shift SET end_time = $2::timestamp WHERE shift_id = $1::integer', [id, endTime]);
}

// updates a shift's station provided by [id: number] and [station: string]
export function updateStation(id: number, station: string) {
    return db.query('UPDATE shift SET station = $2::text WHERE shift_id = $1::integer', [id, station]);
}

// adds a new shift using provided by the parameters: [id: number], [role: string], [startTime: string], 
//    [endTime: string], [station: number], [volunteer_id: number], [event_id: number]
export function addShift(id: number, role: string, startTime: string, 
    endTime: string, station: string, volunteer_id: number, event_id: number) {
    return db.query(`INSERT INTO shift VALUES ($1::integer, $2::text, $3::timestamp, 
        $4::timestamp, $5::text, $6::integer, $7::integer);`, 
        [id, role, startTime, endTime, station, volunteer_id, event_id]);
}

// delete the shift associated with [id:number] from the database
export function deleteShift(id: number) {
    return db.query('DELETE FROM shift WHERE shift_id = $1::integer', [id]);
}


