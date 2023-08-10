import * as db from "../../db";

// returns a query containing the row of the shift specified by [id: number]
export function get_using_shiftID(id: number) {
    return db.query(`SELECT role, start_time, end_time, station, volunteer_id, event_id 
    FROM shift WHERE shift_id = $1::integer`, [id]);
}


// returns a query containing the row of the shift specified by [id: number]
export function get_using_eventID(id: number) {
    return db.query(`
    SELECT shift_id, role, start_time, end_time, station, volunteer_id 
    FROM shift S
    WHERE event_id = $1::integer`, [id]);
}
 

export function get_using_organizerID(id: number) {
    return db.query(`
    SELECT S.*, E.name 
    FROM shift S, event E 
    WHERE S.event_id = E.event_id AND E.organizer_id = $1::integer ORDER BY start_time`
    , [id]);
}

export function get_using_volunteerID(id: number) {
    return db.query(`
    SELECT E.name, shift_id, role, S.start_time, S.end_time, station, S.event_id, E.organizer_id, E.street_num, E.street, E.postal_code, city, province
    FROM shift S, event E NATURAL JOIN city NATURAL JOIN province
    WHERE S.event_id = E.event_id AND volunteer_id = $1::integer ORDER BY start_time`, [id]);
}

export function get_using_noID() {
    return db.query(`
    SELECT shift_id, role, S.start_time, S.end_time, station, S.event_id, E.organizer_id, city, province, E.name 
    FROM shift S, event E, city C, province P 
    WHERE volunteer_id IS NULL AND S.event_id = E.event_id AND E.postal_code = C.postal_code AND E.postal_code = P.postal_code ORDER BY S.start_time`,[]);
}

export async function get_using_noID_filter(attribute: string, type: string) {
    let comp: string = '';
    if (type === 'city') {
        comp = 'AND E.postal_code = C.postal_code'
    } else if (type ==='province') {
        comp = 'AND E.postal_code = P.postal_code'
    }

    return db.query(`
    SELECT shift_id, role, S.start_time, S.end_time, station, S.event_id, E.organizer_id, city, province, E.name 
    FROM shift S, event E, city C, province P 
    WHERE volunteer_id IS NULL AND S.event_id = E.event_id AND E.postal_code = C.postal_code AND E.postal_code = P.postal_code 
        AND ${type} ILIKE $1 || '%' ORDER BY start_time`, [attribute]);
}


export async function get_browser(selection: string[], from: string) {
    let s:string="";
    for(let i=0;i<selection.length;i++) {
        if (selection[i] === 'undefined') {
            s = s.substring(0,s.length-2);
            break;
        } else {
            s = s + selection[i];
            ((i + 1 < selection.length)) ? s = s + ', ' : s = s + ' '
        }
        
    }
    const res = await db.query(`
                        SELECT ${s} 
                        FROM ${from}`,[]);
    return res.rows;
}

export function updateShift(id: number, role: string, startTime: string, 
    endTime: string, station: string, volunteer_id: any) {
    if (volunteer_id === null || volunteer_id == '') {
        return db.query(`
        UPDATE shift 
        SET role = $2::text, 
            start_time = $3::timestamp, 
            end_time = $4::timestamp, 
            station = $5::text, 
            volunteer_id = NULL 
        WHERE shift_id = $1::integer;`, [id, role, startTime, endTime, station]);    
    }
    return db.query(`
    UPDATE shift 
    SET role = $2::text, 
        start_time = $3::timestamp, 
        end_time = $4::timestamp, 
        station = $5::text, 
        volunteer_id = $6::integer 
    WHERE shift_id = $1::integer;`, [id, role, startTime, endTime, station, volunteer_id]);
}

export function acceptShift(id: number, volunteer_id: number) {
    return db.query(`
    UPDATE shift 
    SET volunteer_id = $1::integer 
    WHERE shift_id = $2::integer;`, 
        [volunteer_id, id]);
}


export function dropShift(id: number) {
    return db.query(`
    UPDATE shift 
    SET volunteer_id = null 
    WHERE shift_id = $1::integer;`, [id]);
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
    endTime: string, station: string, volunteer_id: any, event_id: number) {
    
    if (volunteer_id === null || volunteer_id == '') {
        return db.query(`INSERT INTO shift(role, start_time, end_time, station, volunteer_id, 
            event_id) VALUES ($1::text, $2::timestamp, 
            $3::timestamp, $4::text, null, $5::integer);`, 
            [role, startTime, endTime, station, event_id]);
    }

    return db.query(`INSERT INTO shift(role, start_time, end_time, station, volunteer_id, 
        event_id) VALUES ($1::text, $2::timestamp, 
        $3::timestamp, $4::text, $5::integer, $6::integer);`, 
        [role, startTime, endTime, station, volunteer_id, event_id]);
}

// delete the shift associated with [id:number] from the database
export function deleteShift(id: number) {
    return db.query('DELETE FROM shift WHERE shift_id = $1::integer', [id]);
}


