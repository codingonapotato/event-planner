import * as db from "../../db";
export default class User {
    /** EFFECTS: Retrieves the tuple of data corresponding to the user with id = @param id as JSON response object */
    async findUser(id: number, res) {
        db.query(`SELECT * FROM users WHERE user_id = $1`, [id]).then((result) => {
            if (result.rows.length === 0) {
                res.status(404).send('User not found');
            } else {
                res.status(200).send(result.rows);
            }

        })
            .catch((err) => {
                res.status(500).send('Database query failed');
            });
    }

    /** EFFECTS: Updates attributes for user with id = @param id */
    async updateUser(id: number, req, res) {
        const { phone_num: phoneNum, first_name: firstName, last_name: lastName, street, street_num: streetNum, postal_code: postalCode,
            birthdate, email, balance } = req.params;
        const arr = [phoneNum, firstName, lastName, street, streetNum, postalCode, birthdate, email, balance];
        db.query(`UPDATE users SET 
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
        RETURNING *`, arr).then((result) => {
            if (result.rows.length === 0) {
                res.status(404).send('User not found');
            }
            res.status(200).send(result.rows);
        })
            .catch((err) => {
                res.status(500).send('Database query failed');
            });
    }

}

