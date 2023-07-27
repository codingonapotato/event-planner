import * as db from "../../db";

export function findUser(id: number) {
    return db.query('SELECT * FROM users WHERE user_id = $1', [id]);
}
