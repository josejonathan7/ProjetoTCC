const Database = require('./config')
const initDb = {
    async init(){

        const db = await Database()

        await db.exec(`CREATE TABLE tb_animes(
            id TEXT PRIMARY KEY,
            name TEXT,
            link TEXT,
            image TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_games(
            id TEXT PRIMARY KEY,
            name TEXT,
            link TEXT,
            image TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_contact(
            id TEXT PRIMARY KEY,
            name TEXT,
            link TEXT,
            description TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_observation(
            id TEXT PRIMARY KEY,
            name TEXT,
            information TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_sites(
            id TEXT PRIMARY KEY,
            name TEXT,
            link TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_songs(
            id TEXT PRIMARY KEY,
            name TEXT,
            link TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_users(
            id TEXT PRIMARY KEY,
            name TEXT,
            password TEXT,
            avatar TEXT,
            email_contact_link TEXT
            );
        `)
    }
}

initDb.init()