import * as db from "../../db";

/** EFFECTS: Retrieves the tuple of data corresponding to the user with id = @param id as JSON response object */
export async function findUser(id: number) {
    const res = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

/** EFFECTS: Updates attributes for user with id = @param id */
export async function updateUser(id: number, req) {
    const { phone_num: phoneNum, first_name: firstName, last_name: lastName, street, street_num: streetNum, postal_code: postalCode,
        birthdate, email, balance } = req.params;
    const res = await db.query(`UPDATE users SET 
        phone_num = $1,
        first_name = $2, 
        last_name = $3, 
        street = $4, 
        street_num = $5,
        postal_code = $6,
        birthdate = $7,
        email_address = $8,
        balance = $9 
        WHERE user_id=${id}
        RETURNING *`, [phoneNum, firstName, lastName, street, streetNum, postalCode, birthdate, email, balance]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return res.rows;
    }
}

export async function login(email: string, password: string): Promise<number> {
    const res = await db.query('SELECT user_id FROM users WHERE email_address = $1 AND password = $2', [email, password])
    if (res.rows.length === 0) {
        return -1;
    }
    return res.rows[0]['user_id'];
}