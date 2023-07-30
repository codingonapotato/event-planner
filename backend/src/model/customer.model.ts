import * as db from "../../db";
import User from "./user.model"

export default class Customer extends User {
    /**EFFECTS: Checks for existence of customer with @param id and if the user is a customer, then retrieve
     * their data. Otherwise, return 'Customer not found' or handle errors.
     */
    async findUser(id: number, res) {
        db.query(`SELECT * FROM customer WHERE customer_id = $1`, [id]).then((result) => {
            if (result.rows.length === 0) {
                res.status(404).send(`Customer not found`);
            } else {
                super.findUser(id, res);
            }
        })
            .catch((err) => {
                res.status(500).send('Database query failed');
            });
    }

    /** EFFECTS: Retrieves all dependants associated to a customer with id=@param id */
    async getDependant(id: number, res) {
        db.query(`SELECT * FROM dependants WHERE customer_id = $1`, [id]).then((result) => {
            if (result.rows.length === 0) {
                res.status(404).send(`Dependant not found`);
            } else {
                res.status(200).send(result.rows);
            }
        }).catch((err) => {
            res.status(500).send('Database query failed');
        });
    }

    /** EFFECTS: Adds a new dependant associated to a customer with id=@param id */
    async addDependant(id: number, req, res) {
        const { first_name: firstName, last_name: lastName, birthdate } = req.params;
        db.query(`INSERT INTO dependants VALUES ($1, $2, $3, $4) RETURNING *`, [firstName, lastName, id, birthdate]).then((result) => {
            res.status(200).send(result.rows);
        }).catch((err) => {
            res.status(500).send('Database query failed');
        });
    }

    /** EFFECTS: Modifies a new dependant associated to a customer with id=@param id */
    async modifyDependant(id: number, req, res) {
        const { first_name: firstName, last_name: lastName, new_first_name: newFirstName, new_last_name: newLastName, birthdate } = req.params;
        db.query(`UPDATE dependants SET 
        first_name = $1,
        last_name = $2,
        customer_id = $3,
        birthdate = $4 
        WHERE customer_id = $3 AND first_name = $5 AND last_name = $6 
        RETURNING *`, [newFirstName, newLastName, id, birthdate, firstName, lastName]).then((result) => {
            res.status(200).send(result.rows);
        }).catch((err) => {
            res.status(500).send('Database query failed');
        });
    }

    /** EFFECTS: Rempoves a new dependant associated to a customer with id=@param id */
    async removeDependant(id: number, req, res) {
        const { first_name: firstName, last_name: lastName } = req.params;
        db.query(`DELETE FROM dependants 
        WHERE customer_id = $1 AND first_name = $2 AND last_name = $3
        RETURNING *`, [id, firstName, lastName]).then((result) => {
            res.status(200).send(result.rows);
        }).catch((err) => {
            res.status(500).send('Database query failed');
        });
    }

    async getTickets(id: number, req, res) {
        return 0; // stub
    }
}