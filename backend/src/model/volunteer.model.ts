import * as db from "../../db";
import * as User from "./user.model"

export async function findUser(id: number) {
    const res = await db.query(`SELECT * FROM volunteer WHERE voluteer_id = $1`, [id]);
    if (res.rows.length === 0) {
        return -1;
    } else {
        return User.findUser(id);
    }
}