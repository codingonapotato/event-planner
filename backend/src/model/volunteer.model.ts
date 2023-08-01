import * as db from "../../db";
import User from "./user.model"

export default class Volunteer extends User {
    async findUser(id: number, res) {
        db.query(`SELECT * FROM volunteer WHERE voluteer_id = $1`, [id]).then((result) => {
            if (result.rows.length === 0) {
                res.status(404).send(`Volunteer not found`);
            } else {
                super.findUser(id, res);
            }
        })
            .catch((err) => {
                res.status(500).send('Database query failed');
            });
    }
}