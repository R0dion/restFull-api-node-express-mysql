const DBService = require('./DBService');
const dataErrorService = require('./dataErrorService');

class UserService {

    async getAllEmploees () {
        const myQuery = 'SELECT * FROM emploees';
        const data = await DBService.execute(myQuery);
        return data;

    }

    async getEmploeesById (id) {
        this._checkId(id);
        const myQuery = 'SELECT * FROM emploees WHERE id = ?';
        const data = await DBService.execute(myQuery, id);
        this._checkData(data[0]);
        return data[0];
    }

    async addEmploees(body) {
        this._checkBody(body);
        const employeedata = [
            body.name, body.mail, body.city, body.age
        ];
        const myQuery = 'INSERT INTO emploees (`name`, mail, city, age) VALUES (?, ?, ?, ?)';
        const data = await DBService.execute(myQuery, employeedata);
        this._checkData(data);
        return data;
    }

    async deleteEmploeesById (id) {
        this._checkId(id);
        const myQuery = 'DELETE FROM emploees WHERE id=?';
        const data = await DBService.execute(myQuery, id);
        return data;
    }

    async updateEmploeesById (body, id) {
        this._checkId(id);
        this._checkBody(body);
        const employeedata = [
            body.name, body.mail, body.city, body.age, id
        ];
        const myQuery = 'UPDATE emploees AS e SET e.name=?, e.mail=?, e.city=?, e.age=? WHERE id=?';
        const data = await DBService.execute(myQuery, employeedata);
        return data;

    }

    _checkId(id) {
        const checkId = dataErrorService.isNumber(id);
        if (checkId === false) {
            throw new Error('Id data type is incorrect');
        }

    }

    _checkData(data) {
        if (data === undefined) {
            throw new Error('Emploee was not found');
        }

    }

    _checkBody(body) {
        const checkBody = dataErrorService.isObject(body);
        if (checkBody === false) {
            throw new Error('Body  is not a object');
        }
    }
}

module.exports = new UserService();