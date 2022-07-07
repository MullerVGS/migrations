import RunMigrations from "./src/RunMigrations";

(async () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      let migration = new RunMigrations();
      let migrationsToRun = await migration.getMigrationsToRun();
      
      readline.question(`Existem ${migrationsToRun.length} migrations para rodar, deseja rodar as migrations? Y/N`, res => {
        if(res == 'Y' ||res == 'y' ||res == 'Yes' ||res == 'yes' ||res == 'YES'){
            migration.runMigrations();
        }
        readline.close();
      });
})();