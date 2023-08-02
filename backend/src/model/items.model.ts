import * as db from "../../db";

// returns a query containing the row of the item specified by [id: number]
export function get_using_itemID(id: number) {
    return db.query('SELECT * FROM items WHERE item_id = $1::integer', [id]);
}

/**
 * Updates all attributes in item given item_id
 * @param id item that we want to change
 * @param new_id new id that we are updating to
 * @param amount 
 * @param item_name 
 * @returns promise to query result
 */
export function update_item(id: number, amount: number, item_name: string) {
    return db.query(`UPDATE items SET amount = $2::integer, 
        item_name = $3::text WHERE item_id = $1::integer`, [id, amount, item_name]);
}

// // updates a item's ID provided by the old [id: number] and new [new_id: string]
// export function update_item_id(id: number, new_id: number) {
//     return db.query('UPDATE items SET item_id = $2::integer WHERE item_id = $1::integer', [id, new_id]);
// }

// // updates a item's amount provided by [id: number] and [amount: number]
// export function update_amount(id: number, amount: number) {
//     return db.query(`UPDATE items SET amount = $2::integer WHERE item_id = $1::integer`, [id, amount]);
// }

// // updates a item's name provided by [id: number] and [item_name: string]
// export function update_item_name(id: number, item_name: string) {
//     return db.query('UPDATE items SET item_name = $2::text WHERE item_id = $1::integer', [id, item_name]);
// }

// adds a new item using provided by the parameters: [amount: string], [item_name: string]
export function add_item(amount: number, item_name: string) {
    return db.query(`INSERT INTO items(amount, item_name) VALUES ($1::integer, $2::text);`, 
        [amount, item_name]);
}

// delete the item associated with [id:number] from the database
export function delete_item(id: number) {
    return db.query('DELETE FROM items WHERE item_id = $1::integer', [id]);
}




/**
 * Gets venue_location given the primary keys of the item and venue
 * @param street_num 
 * @param street 
 * @param postal_code 
 * @param item_id 
 * @returns promise to query result
 */
export function get_belongs(street_num: number, street: string, postal_code: string, 
    item_id: number) {
    return db.query(`SELECT venue_location FROM belongs WHERE street_num = $1::integer AND 
        street = $2::text AND postal_code = $3::char(6) AND item_id = $4::integer;`, 
        [street_num,street,postal_code,item_id]);
}

export function update_belongs(street_num: number, street: string, postal_code: string, 
    item_id: number, venue_location: string) {
        return db.query(`UPDATE belongs SET venue_location = $5::text WHERE street_num = $1::integer AND 
        street = $2::text AND postal_code = $3::char(6) AND item_id = $4::integer;`, 
        [street_num,street,postal_code,item_id,venue_location]);
}

export function add_belongs(street_num: number, street: string, postal_code: string, 
    item_id: number, venue_location: string) {
    return db.query(`INSERT INTO belongs VALUES ($1::integer, $2::text, $3::char(6), 
        $4::integer, $5::text);`, 
        [street_num,street,postal_code,item_id,venue_location]);
}

export function delete_belongs(street_num: number, street: string, postal_code: string, 
    item_id: number) {
    return db.query(`DELETE FROM belongs WHERE street_num = $1::integer AND 
        street = $2::text AND postal_code = $3::char(6) AND item_id = $4::integer`,
        [street_num,street,postal_code,item_id]);
}




export function get_contributions_specifics(contrib_user_id: number, item_id: number) {
    return db.query(`SELECT contrib_start_time, contrib_end_time, contrib_amt 
        FROM contributes WHERE contrib_user_id = $1::integer AND item_id = $2::integer;`, 
        [contrib_user_id, item_id]);
}

export function get_contributions_user(contrib_user_id: number) {
    return db.query(`SELECT item_id, contrib_start_time, contrib_end_time, contrib_amt 
        FROM contributes WHERE contrib_user_id = $1::integer;`, 
        [contrib_user_id]);
}

export function update_contributions(contrib_user_id: number, item_id: number, new_user_id: number, 
    new_item_id: number, contrib_start_time: string, contrib_end_time: string, 
    contrib_amt: number) {
    return db.query(`UPDATE contributes SET contrib_user_id = $3::integer, 
    item_id = $4::integer, contrib_start_time = $5::timestamp, contrib_end_time = $6::timestamp,
    contrib_amt = $7::integer WHERE contrib_user_id = $1::integer AND item_id = $2::integer;`, 
    [contrib_user_id, item_id, new_user_id, new_item_id, contrib_start_time, contrib_end_time,
    contrib_amt]);
}

export function add_contributions(contrib_user_id: number, item_id: number, contrib_start_time: string,
    contrib_end_time: string, contrib_amt:number) {

    return db.query(`INSERT INTO contributes VALUES ($1::integer, $2::integer, $3::timestamp, 
        $4::timestamp, $5::integer);`, 
        [contrib_user_id, item_id, contrib_start_time, contrib_end_time, contrib_amt]);
}

export function delete_contributes(contrib_user_id: number, item_id: number) {
    return db.query(`DELETE FROM contributes WHERE contrib_user_id = $1::integer AND 
    item_id = $2::integer`,
        [contrib_user_id, item_id]);
}



/**
 * Get requested amount given req_user_id and item_id
 * @param req_user_id 
 * @param item_id 
 * @returns promise to query return
 */
export function get_request_specifics(req_user_id: number, item_id: number) {
    return db.query(`SELECT req_amt FROM requests 
    WHERE req_user_id = $1::integer AND item_id = $2::integer;`, 
        [req_user_id, item_id]);
}

/**
 * Get all quested items and their respective amounts given the requester's id
 * @param req_user_id 
 * @returns promise to query return
 */
export function get_request_requester(req_user_id: number) {
    return db.query(`SELECT item_id, req_amt FROM requests 
    WHERE req_user_id = $1::integer;`, 
        [req_user_id]);
}

export function update_request(req_user_id: number, item_id: number, new_req_user_id: number, 
    new_item_id: number, req_amt: number) {
    return db.query(`UPDATE requests SET req_user_id = $3::integer, item_id = $4::integer, 
    req_amt = $5::integer WHERE req_user_id = $1::integer AND item_id = $2::integer;`, 
    [req_user_id, item_id, new_req_user_id, new_item_id, req_amt]);
}

export function add_request(req_user_id: number, item_id: number, req_amt: number) {

    return db.query(`INSERT INTO requests VALUES ($1::integer, $2::integer, $3::integer);`, 
        [req_user_id, item_id, req_amt]);
}

export function delete_request(req_user_id: number, item_id: number) {
    return db.query(`DELETE FROM requests WHERE req_user_id = $1::integer AND 
    item_id = $2::integer`,
        [req_user_id, item_id]);
}