const fs = require('fs');
const path = require('path');
const File = require('../models/File');

class FileService {
    constructor() {
        this.uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir);
        }
    }

    /**
     * @param {UploadFileDescription} file
     * @returns {File}
     */
    saveFile(file) {

    }

    /**
     * @returns {File[]}
     */
    getAllFiles() {

    }

    /**
     * @param {string} filename
     * @returns {null|File}
     */
    getFile(filename) {

    }
}

module.exports = new FileService();