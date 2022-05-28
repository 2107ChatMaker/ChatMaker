//importing specific modules not the whole library`
import {Db, MongoClient} from 'mongodb';


export default class Database  {
    //database that we are using
   
    static database: Db;
    //mongo client
    static client: MongoClient;

    //sets up the connection to the client and database
    static async setup(uri: string) {
        if (!this.client){
            //do maginc weeee
            await this.setupClient(uri);
            await this.setupDatabase();
        }

        return this.database
    }

    static async setupClient(uri: string) {
        const client = new MongoClient(uri);

        //connect client to server 
        await client.connect();
        this.client = client
    }

    /**
     * sets up database for later user 
     * uses default but u can change the name 
     */
    static async setupDatabase(){
        //deafult is the placeholder name of database 
        this.database = this.client.db('Chatmaker');
    }
}