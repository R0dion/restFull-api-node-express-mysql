const mysql = require('mysql');
class DBService {
    constructor() {
        this.pool = null;
    }

     _createPool() {
        const config = {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'test'

        };

         this.pool = mysql.createPool(config);

    }

    async execute(query, queryParams) {
        if (this.pool === null) {
            this._createPool();

        }

        const rowsData = await new Promise ((resolve, reject) => {
            this.pool.query(query, queryParams, (err, rows) => {
                !err ? resolve(rows) : reject(err); // check reject
            });
        });
        return (rowsData);
        }
}
module.exports = new DBService();