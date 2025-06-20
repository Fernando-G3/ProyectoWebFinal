
const { Event, sequelize } = require('../models');
const { Op } = require('sequelize');

class EventDAO {

  // Crear evento
  static async createEvent(eventData) {
    const transaction = await sequelize.transaction();

    try {
      const newEvent = await Event.create({
        eventName: eventData.eventName,
        eventDate: eventData.eventDate,
        eventCity: eventData.eventCity,
        eventLocation: eventData.eventLocation,
        accesibility: eventData.accesibility,
        isAvailable: eventData.isAvailable,
        idOwner: eventData.idOwner,
        eventMap: eventData.eventMap,
        eventPromotional: eventData.eventPromotional
      }, { transaction });
      await transaction.commit();
      return newEvent.get({ plain: true });

    } catch (error) {
      await transaction.rollback();
      console.error('Error in createEvent:', error.message);
      throw new Error('No se pudo crear el evento');
    }
  }

  // Editar evento por ID
  static async updateEvent(eventData) {
    const transaction = await sequelize.transaction();
    try {
      const { idEvent, ...updatedFields } = eventData;
      const [updatedRows] = await Event.update(updatedFields, {
        where: { idEvent },
        transaction
      });

      await transaction.commit();
      return updatedRows > 0; // true si se actualizó algo, false si no
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error al actualizar el evento');
    }
  }

  // Expirar eventos pasados
  static async expirePastEvents() {
    const transaction = await sequelize.transaction();
    try {
      const now = new Date();

      const [updatedRows] = await Event.update(
        { isAvailable: 'Expirado' },
        {
          where: {
            eventDate: {
              [require('sequelize').Op.lt]: now
            },
            isAvailable: 'Activo'
          },
          transaction
        }
      );

      await transaction.commit();
      return updatedRows; // número de eventos actualizados

    } catch (error) {
      await transaction.rollback();
      throw new Error('Error al expirar eventos pasados');
    }
  }

  // Obtener todos los eventos disponibles
  static async getAllAvailableEvents() {
    const transaction = await sequelize.transaction();
    try {
      const events = await Event.findAll({
        where: { isAvailable: 'Activo' },
        transaction
      });
      await transaction.commit();
      return events;

    } catch (error) {
      await transaction.rollback();
      throw new Error('Error al obtener eventos disponibles');
    }
  }

  // Obtener eventos por propietario
  static async getEventsByOwner(idOwner) {
    const transaction = await sequelize.transaction();
    try {
      const events = await Event.findAll({
        where: { idOwner },
        transaction
      });
      await transaction.commit();
      return events;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error al obtener eventos del usuario');
    }
  }


static async getEventsWithAccessibility() {
  const transaction = await sequelize.transaction();
  try {
    const events = await Event.findAll({
      where: {
        accesibility: {
          [Op.and]: [
            { [Op.ne]: null },
            { [Op.ne]: '' }
          ]
        },
        isAvailable: 'Activo'
      },
      transaction
    });
    await transaction.commit();
    return events;

  } catch (error) {
    await transaction.rollback();
    throw new Error('Error al obtener eventos con accesibilidad');
  }
}

  
  // Recuperar los últimos 5 eventos registrados
  static async getLastFiveEvents() {
    const transaction = await sequelize.transaction();
    try {
      const events = await Event.findAll({
        order: [['idEvent', 'DESC']], // Ordenar por idEvent descendente
        limit: 5, // Obtener solo los últimos 5 eventos
        transaction
      });
      await transaction.commit();
      return events;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error al obtener los últimos 5 eventos');
    }
  }


}

module.exports = EventDAO;