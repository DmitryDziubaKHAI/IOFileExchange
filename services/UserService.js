const User = require('../models/User');

class UserService {
    constructor() {

    }

    /**
     *
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @returns {boolean}
     */
    createUser(username, email, password) {

    }

    /**
     * @param {string} email
     * @param {string} password
     * @returns {boolean}
     */
    login(email, password) {

    }

    /**
     * @returns void
     */
    logout() {

    }
}

module.exports = new UserService();
