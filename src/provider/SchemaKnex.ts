import knex from 'knex';
import Config from '../config/Config';

export default knex({
  client: 'pg',
  connection: Config.database,
  migrations: {
    tableName: `migrations_schema`,
    directory: `migrations/schema`
  }
});