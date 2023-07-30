import * as db from "../../db";

export function findUser(id: number) {
    return db.query('SELECT * FROM users WHERE user_id = $1', [id]);
}

export async function login(email: string, password: string): Promise<number> {
    const res = await db.query('SELECT user_id FROM users WHERE email_address = $1 AND password = $2', [email, password])
    if (res.rows.length === 0) {
        return -1;
    }
    return res.rows[0]['user_id'];

}

