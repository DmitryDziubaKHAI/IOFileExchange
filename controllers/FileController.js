const fileService = require('../services/FileService');

class FileController {
    /**
     * @param {import('express').Request & {file: UploadFileDescription} & {session: object}} req
     * @param {import('express').Response} res
     */
    uploadFile(req, res) {
        const file = fileService.saveFile(req.file);
        res.status(201).json({ success: true, file });
    }

    /**
     * @param {import('express').Request & {session: object}} req
     * @param {import('express').Response} res
     */
    listFiles(req, res) {
        const files = fileService.getFilesListByUserId(req.session.id);
        res.status(200).json(files);
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    downloadFile(req, res) {
        /**
         * @todo
         */
        const file = null;
        if (file) {
            res.download(file.filepath);
        } else {
            res.status(404).json({success: false});
        }
    }
}

module.exports = new FileController();
