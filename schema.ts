import CreateMigration from "./src/CreateMigration";

(async () => {
    let createMigration = new CreateMigration();
    createMigration.createSchemaMigration();
})();