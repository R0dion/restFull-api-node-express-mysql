const DBService = require('./DBService');
const dataErrorService = require('./dataErrorService');

class UserService {

    async getAllEmploees () {
        const myQuery = 'SELECT * FROM emploees';
        const data = await DBService.execute(myQuery);
        if (data === undefined) {
            return ('Emploees data was not found');
        }
        return data;

    }

    async getEmploeesById (id) {
        const checkId = dataErrorService.isNumber(id);
        if (checkId === true) {
            return ('Id data type is incorrect');
        }
        const myQuery = 'SELECT * FROM emploees WHERE id = ?';
        const data = await DBService.execute(myQuery, id);
        if (data[0] === undefined) {
            return ('Emploee was not found');
        }
        return data;

    }

    async addEmploees(body) {
        // add more error handlers
        if (body === undefined) {
            return ('Body data Error');
        }
        const employeedata = [
            body.name, body.mail, body.city, body.age
        ];
        const myQuery = 'INSERT INTO emploees (`name`, mail, city, age) VALUES (?, ?, ?, ?)';
        const data = await DBService.execute(myQuery, employeedata);
        if (data === undefined) {
            return ('Emploee was not found');
        }
        return data;
    }

    async deleteEmploeesById (id) {
            const checkId = dataErrorService.isNumber(id);
            if (checkId === true) {
                return ('Id data type is incorrect');
            }
            const myQuery = 'DELETE FROM emploees WHERE id=?';
            const data = await DBService.execute(myQuery, id);
            return data;
    }

    async updateEmploeesById (body, id) {
            if (body === undefined) {
                return ('Body data Error');
            }
            const checkId = dataErrorService.isNumber(id);
            if (checkId === true) {
                return ('Id data type is incorrect');
            }
            const checkBody = dataErrorService.isObject(body);

            if (checkBody === false) {
                return ('Body  is not a object');
            }
            const employeedata = [
                body.name, body.mail, body.city, body.age, id
            ];

            const myQuery = 'UPDATE emploees AS e SET e.name=?, e.mail=?, e.city=?, e.age=? WHERE id=?';
            const data = await DBService.execute(myQuery, employeedata);
            return data;

    }
}

module.exports = new UserService();