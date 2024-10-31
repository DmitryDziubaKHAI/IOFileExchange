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
        const filePath = path.join(this.uploadDir, file.originalname);
        fs.writeFileSync(filePath, file.buffer);

        return new File(
            file.originalname,
            filePath,
            file.size
        );
    }

    /**
     * @returns {File[]}
     */
    getAllFiles() {
        const files = fs.readdirSync(this.uploadDir);

        const result = [];

        for (const filename of files) {
            if (filename === '.gitkeep') {
                continue;
            }
            const filePath = path.join(this.uploadDir, filename);
            const stats = fs.statSync(filePath);

            result.push(new File(
                filename,
                filePath,
                stats.size
            ));
        }

        return result;
    }

    /**
     * @param {string} filename
     * @returns {null|File}
     */
    getFile(filename) {
        const filePath = path.join(this.uploadDir, filename);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const stats = fs.statSync(filePath);

        return new File(
            filename,
            filePath,
            stats.size
        );
    }
}

module.exports = new FileService();