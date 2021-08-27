module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "entities": [ "dist/entities/*.js" ],
    "migrations": [ "dist/database/migrations/*.js" ],
    "cli":{
        "migrationsDir": "src/database/migrations/",
        "entitiesDir": "src/entities/"
    }
}