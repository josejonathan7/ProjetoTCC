const Database = require('./config')
const initDb = {
    async init(){

        const db = await Database()

        await db.exec(`CREATE TABLE tb_animes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            link TEXT,
            image TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_games(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            link TEXT,
            image TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_contact(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            link TEXT,
            description TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_observation(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            information TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_sites(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            link TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_songs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            link TEXT
            ); 
        `)

        await db.exec(`CREATE TABLE tb_users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            password TEXT,
            avatar TEXT
            );
        `)
    }
}

initDb.init()