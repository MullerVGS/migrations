import publicMigration from './provider/PublicKnex';
import schemaMigration from './provider/SchemaKnex';

export default class RunMigrations {
    constructor() {}
    
    public async runMigrations() {
        let migrationsToRun = await this.getMigrationsToRun();
        if(migrationsToRun.length == 0){
            console.log("Nenhuma migration para rodar");
            return;
        };
        console.table(migrationsToRun);

        try {
            for await (const migrationToRun of migrationsToRun) {
                if(migrationToRun.type === 'public'){
                    console.log(`Rodando versão ${migrationToRun.file} no public`);
                    await this.runPublicMigration(migrationToRun);
                }
                if(migrationToRun.type === 'schema'){
                    console.log(`Rodando versão ${migrationToRun.file} no schema ${migrationToRun.schema}`);
                    await this.runSchemaMigrations(migrationToRun);
                }
            }
        } catch (error) {
            throw error;
        }
        console.log("Migrations terminadas");
    }

    private async runPublicMigration(migration: {file: string, directory: string}) {
        await publicMigration.migrate.up({
            name: migration.file,
            directory: migration.directory,
        });
    }

    private async runSchemaMigrations(migration: {file: string, directory: string, schema: string}) {
        schemaMigration.client.config["schemaName"] = migration.schema;
        await schemaMigration.migrate.up({
            name: migration.file,
            directory: migration.directory,
            schemaName: migration.schema
        });
        return;
    }

    private async getMigrationsToRun(): Promise<{file: string, directory: string, type:string, schema:string}[]> {
        let migrationsToRun = [];
        let publicMigrations = await publicMigration.migrate.list();
        for (const migration of publicMigrations[1]) {
            migrationsToRun.push({...migration, type: 'public', schema: 'public'});
        }
        
        let schemas = await this.getSchemas();
        for await (const schema of schemas) {
            let schemaMigrations = await schemaMigration.migrate.list({
                schemaName: schema.nspname
            });
            for await (const migration of schemaMigrations[1]) {
                migrationsToRun.push({...migration, type: 'schema', schema: schema.nspname});
            }
        }
        migrationsToRun = this.orderArray(migrationsToRun, "file");
        return migrationsToRun;
    }

    private async getSchemas() {
        try {
            const sql = `SELECT nspname 
                            FROM pg_catalog.pg_namespace 
                            WHERE nspname !~ '^pg_' 
                            AND nspname not in ('information_schema','public');`;
            let data: any = await publicMigration.schema.raw(sql);
            //Remove o schema migrations
            data.rows = data.rows.filter(sch => {
                return sch.nspname !== `migrations`
            });

            return data.rows;
        } catch (error) {
            console.error('Erro ao buscar os schemas');
            console.error(error);
            throw error;
        }
    }

    private orderArray(array, field) {
        array = array.sort((a, b) => {
            let aField = a[field].replace(/[a-zA-Z]/g,'');
            let bField = b[field].replace(/[a-zA-Z]/g,'');
            if(aField > bField){
                return 1;
            }
            if(aField < bField){
                return -1;
            }
            return 0;
        });
        array = array.sort((a, b) => {
            let aField = a[field].replace(/\D/g,'');
            let bField = b[field].replace(/\D/g,'');
            if (Number(aField) > Number(bField)) {
                return 1;
            }
            if (Number(aField) < Number(bField)) {
                return -1;
            }
            return 0;
        });
        return array
    }
}