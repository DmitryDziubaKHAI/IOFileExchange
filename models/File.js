/**
 * @property {string} filename
 * @property {string} filepath
 * @property {number} size
 * @property {number} userId
 * @property {string} password
 * @property {Date} createdAt
 */
class File {
    constructor(filename = '', filepath = '', size = 0, createdAt = new Date()) {
        this.filename = filename;
        this.filepath = filepath;
        this.size = size;
        this.createdAt = createdAt;
    }

    /**
     * The method updates current password field with a hash of raw password
     */
    hashPassword() {

    }

    /**
     * The method checks a password if the password equals to file's password
     * @param password raw password from a user
     * @returns {boolean} whether the password is correct
     */
    checkPassword(password) {

    }
}

module.exports = File;