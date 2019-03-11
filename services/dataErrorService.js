class DataErrorService {

    isNumber(id) {
        const checkedId = parseInt(id);
        return !isNaN(checkedId);
    }

    isObject(body) {
        const checkedBody = typeof body;
        if (checkedBody === 'object') {
            return true;
        }

    }
}

module.exports = new DataErrorService();