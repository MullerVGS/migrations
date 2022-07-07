import Config from "./src/config/Config";
import RunMigrations from "./src/RunMigrations";

(async () => {
    if(Config.database){
        console.log("Conectando no banco de dados com as credenciais:");
        console.table(Config.database);
    }

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