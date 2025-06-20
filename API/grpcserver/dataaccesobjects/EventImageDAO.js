const { where } = require('sequelize');
const { eventImages } = require('../models');

class EventImagesDAO {

  static async createImage(data) {
    try {
      const { idEvent, fileName, fileType, fileRoute } = data;

      if (!idEvent || !fileName || !fileType || !fileRoute) {
        throw new Error('Todos los campos (idEvent, fileName, fileType, fileRoute) son obligatorios');
      }

      const newImage = await EventImages.create({
        idEvent,
        fileName,
        fileType,
        fileRoute
      });

      return newImage;

    } catch (error) {
      console.error('Error al crear la imagen del evento:', error.message);
      throw new Error('No se pudo registrar la imagen del evento');
    }
  }

  static async getImageById(idImage) {
    try {
      if (!idImage) {
        throw new Error('El idImage es obligatorio');
      }

      const image = await EventImages.findByPk(idImage);

      if (!image) {
        throw new Error(`No se encontró ninguna imagen con el ID: ${idImage}`);
      }

      return image;

    } catch (error) {
      console.error('Error al obtener imagen por ID:', error.message);
      throw new Error('Error al buscar la imagen');
    }
  }

  static async getEventByType(fileType) {
    try {
      if (!fileType) {
        throw new Error('El fileType es obligatorio');
      }

      const images = await EventImages.findAll({
        where: { fileType }
      });

      return images;

    } catch (error) {
      console.error('Error al obtener imágenes por tipo:', error.message);
      throw new Error('Error al buscar imágenes por tipo');
    }
  }

  // Obtener todas las imágenes asociadas a un evento
  static async getImagesByEvent(idEvent) {
    try {
      if (!idEvent) {
        throw new Error('El idEvent es obligatorio');
      }

      const images = await EventImages.findAll({
        where: { idEvent }
      });

      return images;

    } catch (error) {
      console.error('Error al obtener imágenes por idEvent:', error.message);
      throw new Error('Error al buscar imágenes del evento');
    }
  }
}

module.exports = EventImagesDAO;
