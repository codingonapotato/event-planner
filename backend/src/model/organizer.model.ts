import * as db from "../../db";
import User from "./user.model"

export default class Organizer extends User {
    /**EFFECTS: Checks for existence of customer with @param id and if the user is a customer, then retrieve
         * their data. Otherwise, return 'Customer not found' or handle errors.
         */
    async findUser(id: number, res) {
        db.query(`SELECT * FROM organizer WHERE organizer_id = $1`, [id]).then((result) => {
            if (result.rows.length === 0) {
                res.status(404).send('Organizer not found');
            } else {
                super.findUser(id, res);
            }
        })
            .catch((err) => {
                res.status(500).send('Database query failed');
            });
    }

}