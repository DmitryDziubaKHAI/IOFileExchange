const uuid = require('uuid');
const mime = require('mime-types');
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
        const filePath = path.join(this.uploadDir, uuid.v4() + '.' + mime.extension(file.mimetype));
        fs.writeFileSync(filePath, file.buffer);
        const fileModel = new File();

        fileModel.userId = file.userId;
        fileModel.filename = file.originalname;
        fileModel.filepath = filePath;
        fileModel.size = file.size;
        fileModel.password = file.password;
        fileModel.hashPassword();

        FileRepository.saveFile(fileModel)
        return fileModel;
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