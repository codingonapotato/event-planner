import * as db from "../../db";

export function findShift(id: number) {
    return db.query('SELECT * FROM shift WHERE shift_id = $1', [id]);
}
