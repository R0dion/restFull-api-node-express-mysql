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

    execute(query, queryParams) {
        return new Promise((resolve, reject) => {
            if (this.pool === null) {
                this._createPool();

            }
            this.pool.query(query, queryParams, (err, rows) => {
                !err ? resolve(rows) : reject(err);
            });

        });
    }
}
module.exports = new DBService();