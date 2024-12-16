const File = require('../models/File');

class FileRepository {

    /**
     * The method saves a file model to a storage
     * @param {File} file
     */
    saveFile(file) {

    }

    /**
     * The method retrieves a file model by its id
     * @param {number} id
     * @returns {File}
     */
    getFileById(id) {

    }

    /**
     * The method retrieves file models by user id
     * @param {number} id
     * @returns {File[]}
     */
    getFilesListByUserId(id) {

    }
}

module.exports = new FileRepository();