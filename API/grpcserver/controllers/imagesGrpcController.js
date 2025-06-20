const fs = require('fs');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const DocumentoDAO = require('../dataaccesobjects/EventImageDAO');
const e = require('express');
const EventImagesDAO = require('../dataaccesobjects/EventImageDAO');

const uploadImage = (req, res) => {
    try {
        const folderPath = getEventFolder(req.request.idEvent);
        const fullPath = path.join(folderPath, req.request.fileName);

        remakeImage(req.request.content, fullPath, (err, statuscode) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                return res({
                    code: grpc.status.INTERNAL,
                    message: 'Error al guardar el archivo: ' + err.message,
                });
            }

            console.log('Archivo guardado exitosamente:', statuscode);


            const information = {idEvent : req.request.idEvent, 
                fileName : req.request.fileName, 
                fileType : req.request.fileType, 
                path : fullPath};
            EventImagesDAO.createImage(information);

            const { idEvent, fileName,  fileType, path} = req.request;
            const image = {
                IdEvent: idEvent,
                FileName: fileName,
                FileType: fileType,
                Path: path
            };

            res(null, { response: 200, image });
        });
    } catch (err) {
        console.error('Error inesperado:', err);
        res({
            code: grpc.status.UNKNOWN,
            message: 'Error inesperado al subir el archivo',
        });
    }
};

const remakeImage = (imageContent, fullPath, callback) => {
    try {
        fs.writeFile(fullPath, imageContent, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, 'Archivo recreado exitosamente.');
        });
    } catch (err) {
        callback(err);
    }
};

const getEventFolder = (folderName) => {
    try {
        const finalFolderPath = path.resolve(__dirname, '../EventImages/' + folderName);
        const res = finalFolderPath;
    
        if (!fs.existsSync(finalFolderPath)) {
            fs.mkdirSync(path.resolve(finalFolderPath));     
        } 
    
        return res;

    } catch (err){
        throw err;
    }
};

const downloadImage = async (req, res) => {
        try {
            const idImageEvent = req.request.idImage;
            console.log(idImageEvent);
            const imagePath = await EventImagesDAO.getImageById(idImageEvent);
    
            if (!fs.existsSync(imagePath)) {
                throw new Error('Archivo no encontrado');
            }

            const imageData = await readFileAsync(imagePath);
    
            res(null, {content:imageData});

        } catch (err) {
            console.error('Error inesperado:', err);
            res({
                code: grpc.status.UNKNOWN,
                message: 'Error inesperado al descargar el archivo',
            });
        }
};


module.exports = {uploadImage, downloadImage}
