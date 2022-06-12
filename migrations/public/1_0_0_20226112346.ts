import { Knex } from "knex";
import * as fs from "fs";
import * as path from 'path'

export async function up(knex: Knex): Promise<void> {
    const fileName = path.basename(__filename).split('.')[0];
    let sql = await fs.readFileSync(`${__dirname}\\${fileName}.sql`).toString();
    await knex.schema.raw(sql);
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.raw('');
}

