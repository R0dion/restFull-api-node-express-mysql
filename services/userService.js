const DBService = require('./DBService');
const dataErrorService = require('./dataErrorService');

class UserService {

    getAllEmploees () {

        return new Promise((resolve, reject) => {
            const myQuery = 'SELECT * FROM emploees';
            DBService.execute(myQuery).then((fulfilled) => {
                    resolve(fulfilled);
                }).catch((err) => {
                    reject(err);

                });

        });

    }

    getEmploeesById (id) {
        return new Promise((resolve, reject) => {
            const checkId = dataErrorService.isNumber(id);
            if (checkId === true) {
                return reject('Data type is incorrect');
            }
            const myQuery = 'SELECT * FROM emploees WHERE id = ?';
            DBService.execute(myQuery, id).then((fulfilled) => {
                if (fulfilled[0] === undefined) {
                    return reject('Emploee was not found');
                }
                resolve(fulfilled[0]);
            });

        });

    }

    addEmploees(body) {
        return new Promise((resolve, reject) => {
            if (body === undefined) {
                return reject('Body data Error');
              }
            const employeedata = [
                body.name, body.mail, body.city, body.age
            ];
            const myQuery = 'INSERT INTO emploees (`name`, mail, city, age) VALUES (?, ?, ?, ?)';
            DBService.execute(myQuery, employeedata).then((fulfilled) => {
                resolve(fulfilled);
                });

        });

    }

    deleteEmploeesById (id) {
        return new Promise((resolve, reject) => {
            const checkId = dataErrorService.isNumber(id);
            if (checkId === true) {
                return reject('Id data type is incorrect');
            }
            const myQuery = 'DELETE FROM emploees WHERE id=?';
            DBService.execute(myQuery, id).then((fulfilled) => {
                    resolve(fulfilled);
                });

        });

    }

    updateEmploeesById (body, id) {
        console.log(body);
        return new Promise((resolve, reject) => {
            if (body === undefined) {
                return reject('Body data Error');
            }
            const checkId = dataErrorService.isNumber(id);
            if (checkId === true) {
                return reject('Id data type is incorrect');
            }
            const checkBody = dataErrorService.isObject(body);

            if (checkBody === false) {
                return reject('Body  is not a object');
            }
            const employeedata = [
                body.name, body.mail, body.city, body.age
            ];

            const myQuery = 'UPDATE emploees AS e SET e.name=?, e.mail=?, e.city=?, e.age=? WHERE id=?';
            DBService.execute(myQuery, [...employeedata, id])
                .then((fulfilled) => {
                    resolve(fulfilled);
                });

        });

    }
}

module.exports = new UserService();