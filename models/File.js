/**
 * @property {string} filename
 * @property {string} filepath
 * @property {number} size
 * @property {Date} createdAt
 */
class File {
    constructor(filename = '', filepath = '', size = 0, createdAt = new Date()) {
        this.filename = filename;
        this.filepath = filepath;
        this.size = size;
        this.createdAt = createdAt;
    }
}

module.exports = File;