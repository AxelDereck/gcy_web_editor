const mysql = require( 'mysql' );

class Database {
    constructor( config ) {
        /*
        console.log('Target Host : ' + config.host);
        console.log('Target User : ' + config.user);
        console.log('Target Pwd : ' + config.password);
        console.log('Target DB : ' + config.database);
        */
        //this.db = mysql.createConnection( config );
        this.db = mysql.createConnection({
            host:   'localhost',
            user: 'DbUser',
            password: 'sqL-D@ta.100',
            database: 'gcydb',
            port: 3306
        });
        //console.log(this.db);
        this.db.connect((err) => {
            if (err) {
                throw err;
            }
            console.log('Connected to database');
        });
        console.log('Connected to database');
    }

    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.db.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }

    close() {
        return new Promise( ( resolve, reject ) => {
            this.db.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

module.exports = Database;