import * as fs from 'fs';
export default class CreateMigration {
    constructor() {}


    public async createPublicMigration() {
        let currentVersion = await this.getCurrentVersion();
        let migrationName = `${currentVersion}_${this.formatDate(new Date())}`;

        const templateTSPath = `./src/templates/public_migration.ts`;
        const templateSQLPath = `./src/templates/public_migration.sql`;

        const migrationTSPath = `./migrations/public/${migrationName}.ts`;
        const migrationSQLPath = `./migrations/public/${migrationName}.sql`;

        await this.copyFile(templateTSPath, migrationTSPath);
        await this.copyFile(templateSQLPath, migrationSQLPath);

        return;
    }

    public async createSchemaMigration() {
        let currentVersion = await this.getCurrentVersion();
        let migrationName = `${currentVersion}_${this.formatDate(new Date())}`;

        const templateTSPath = `./src/templates/schema_migration.ts`;
        const templateSQLPath = `./src/templates/schema_migration.sql`;

        const migrationTSPath = `./migrations/schema/${migrationName}.ts`;
        const migrationSQLPath = `./migrations/schema/${migrationName}.sql`;

        await this.copyFile(templateTSPath, migrationTSPath);
        await this.copyFile(templateSQLPath, migrationSQLPath);

        return;
    }

    //get current version from package.json
    private async getCurrentVersion() {
        const packageData = await fs.readFileSync(`./package.json`, 'utf8');
        const packageJson = JSON.parse(packageData);
        let version = packageJson.version;
        version = version.replace(/\./g, '_');
        return version;
    }


    private formatDate(date: Date) {
        let year = date.getFullYear();
        let month = (date.getMonth()+1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hour = date.getHours().toString().padStart(2, '0');
        let minute = date.getMinutes().toString().padStart(2, '0');

        return `${year}${month}${day}${hour}${minute}`;
    }

    //copy file from one folder to another
    private copyFile(oldPath: string, newPath: string) {
        return new Promise((resolve, reject) => {
            fs.copyFile(oldPath, newPath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(null);
            });
        });
    }
}