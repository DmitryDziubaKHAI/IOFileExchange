const fileService = require('../services/FileService');

class FileController {
    /**
     * @param {import('express').Request & {file: UploadFileDescription}} req
     * @param {import('express').Response} res
     */
    uploadFile(req, res) {
        const file = fileService.saveFile(req.file);
        res.status(201).json({ success: true, file });
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    listFiles(req, res) {
        const files = fileService.getAllFiles();
        res.status(200).json(files);
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    downloadFile(req, res) {
        const file = fileService.getFile(req.params.filename);
        if (file) {
            res.download(file.filepath);
        } else {
            res.status(404).json({success: false});
        }
    }
}

module.exports = new FileController();
