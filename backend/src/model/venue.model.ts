import * as db from "../../db";

async function addLocation(postal_code: string, city: string, province: string) {
    await db.query(`INSERT INTO city(postal_code, city) VALUES ($1, $2) ON CONFLICT (postal_code) DO NOTHING`, [postal_code, city]);
    await db.query(`INSERT INTO province(postal_code, province) VALUES ($1, $2) ON CONFLICT (postal_code) DO NOTHING`, [postal_code, province]);
}

export async function addVenue(params: any[]) {
    const [
        street_num,
        street,
        postal_code,
        city,
        province
    ] = params;

    addLocation(postal_code, city, province);
    await db.query(`
        INSERT INTO venue(street_num, street, postal_code)
        VALUES ($1, $2, $3)
        ON CONFLICT (street_num, street, postal_code) DO NOTHING
    `, [street_num, street, postal_code]);
}
