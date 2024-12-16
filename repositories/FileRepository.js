const File = require('../models/File');
const path = require("path");
const fs = require("fs");

class FileRepository {
    /**
     * @type {string}
     * @protected
     */
    dir;

    constructor() {
        this.dir = path.join(__dirname, '..', 'runtime', 'filesDb');
    }

    writeIndex(name, index) {
        const indexFile = path.join(this.dir, `index_${name}.json`);
        fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));
    }

    readIndex(name) {
        const indexFile = path.join(this.dir, `index_${name}.json`);
        if (fs.existsSync(indexFile)) {
            const index = fs.readFileSync(indexFile).toString();
            return JSON.parse(index);
        }
        return null;
    }

    writeUserDb(id, db) {
        const dbFile = path.join(this.dir, `file_${id}.json`);
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
    }

    readUserDb(id) {
        const dbFile = path.join(this.dir, `file_${id}.json`);
        if (fs.existsSync(dbFile)) {
            const data = fs.readFileSync(dbFile).toString();
            return JSON.parse(data);
        }
        return {
            meta: {
                count: 0,
                lastId: 0
            },
            data: {}
        };
    }

    /**
     * The method saves a file model to a storage
     * @param {File} file
     */
    saveFile(file) {
        const db = this.readUserDb(file.userId);
        if (!file.id) {
            file.id = ++db.meta.lastId;
            db.meta.count++;
        }
        db.data[file.id] = file;
        this.writeUserDb(file.userId, db);
        const indexFileIdUserId = this.readIndex('file_id_user_id') || {};
        indexFileIdUserId[file.id] = file.userId;
        this.writeIndex('file_id_user_id', indexFileIdUserId);
    }

    /**
     * The method retrieves a file model by its id
     * @param {number} id
     * @returns {File|null}
     */
    getFileById(id) {
        const index = this.readIndex('file_id_user_id') || {};
        const userId = index[id];
        if(!userId) {
            return null;
        }
        const db = this.readUserDb(userId);
        const fileData = db.data[id];
        return fileData ? File.fromAttributes(fileData) : null;
    }

    /**
     * The method retrieves file models by user id
     * @param {number} id
     * @returns {File[]}
     */
    getFilesListByUserId(id) {
        const db = this.readUserDb(id);
        return Array.values(db.data);
    }
}

module.exports = new FileRepository();