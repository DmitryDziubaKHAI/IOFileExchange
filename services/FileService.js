const fs = require('fs');
const path = require('path');
const File = require('../models/File');
const FileRepository = require('repositories/FileRepository');

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
        const filePath = path.join(this.uploadDir, file.originalname);
        fs.writeFileSync(filePath, file.buffer);

        return new File(
            file.originalname,
            filePath,
            file.size
        );
    }

    /**
     * @param {number} id
     * @returns {File[]}
     */
    getFilesListByUserId(id) {

    }

    /**
     * @param {number} id
     * @returns {null|File}
     */
    getFileById(id) {

    }
}

module.exports = new FileService();