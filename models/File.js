/**
 * @property {number} id
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
     * The method creates an object from attributes
     * @param {object} attributes
     * @returns {File}
     */
    static fromAttributes(attributes) {
        const file = new File();
        file.setAttributes(attributes);
        return file;
    }

    /**
     * The method sets attributes to the object
     * @param {object} attributes attribute => value
     */
    setAttributes(attributes) {
        for (const attributesKey in attributes) {
            if (attributes.hasOwnProperty(attributesKey)) {
                this[attributesKey] = this.castAttributeValue(attributesKey, attributes[attributesKey]);
            }
        }
    }

    /**
     * The method casts value according to an attribute name
     * @param {string} attributeName
     * @param {*} attributeValue
     * @returns {*}
     */
    castAttributeValue(attributeName, attributeValue) {
        const map = {
            id: (v) => Number(v),
            size: (v) => Number(v),
            userId: (v) => Number(v),
            createdAt: (v) => Date.parse(v)
        }
        return map[attributeName] ? map[attributeName].call(this, attributeValue) : attributeValue;
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