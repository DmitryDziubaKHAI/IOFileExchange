const fileService = require('../services/FileService');

class FileController {
    /**
     * @param {import('express').Request & {file: UploadFileDescription} & {session: object}} req
     * @param {import('express').Response} res
     */
    async uploadFile(req, res) {
        const file = await fileService.saveFile(req.file);
        res.status(201).json({ success: true, file });
    }

    /**
     * @param {import('express').Request & {session: object}} req
     * @param {import('express').Response} res
     */
    listFiles(req, res) {
        const files = fileService.getFilesListByUserId(req.session.user.id);
        res.status(200).json(files.map(file => {
            file.downloadPage = '/downloadPage/' + file.id;
            return file;
        }));
    }

    /**
     * @param {import('express').Request & {session: object}} req
     * @param {import('express').Response} res
     */
    async downloadFile(req, res) {
        const {id, key} = req.body;
        const file = fileService.getFileById(id);
        if(!file || !(await file.checkDownloadTmpKey(key, req.session.userId))) {
            res.status(404).json({success: false});
            return;
        }
        res.download(file.filepath);
    }
}

module.exports = new FileController();
