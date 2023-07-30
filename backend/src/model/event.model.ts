import * as db from "../../db";

export function findEvent(id: number) {
    return db.query('SELECT * FROM event WHERE event_id = $1', [id]);
}