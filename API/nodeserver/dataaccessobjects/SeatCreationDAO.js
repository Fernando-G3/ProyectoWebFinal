const { sequelize } = require('../models');
const Section = require('../models/section');
const Seat = require('../models/seat');

class SeatCreationDAO {

  static async createSection(sectionData) {
    const transaction = await sequelize.transaction();
    try {
      const newSection = await Section.create(sectionData, { transaction });
      await transaction.commit();
      return newSection;

    } catch (error) {
      await transaction.rollback();
      console.error('Error in createSection:', error.message);
      throw new Error('No se pudo crear la sección');
    }
  }

  /**
   * Crea múltiples asientos con un prefijo y un rango numérico (e.g., A1-A50).
   * @param {string} prefix - Prefijo del asiento, e.g., 'A'
   * @param {number} start - Número inicial del asiento
   * @param {number} end - Número final del asiento
   * @param {number} idSection - Sección a la que pertenecen
   * @returns {Promise<Array>} - Lista de asientos creados
   */
  static async createSeatsInRange(prefix, start, end, idSection) {
    const transaction = await sequelize.transaction();
    try {
      if (!prefix || start < 1 || end < start || !idSection) {
        throw new Error('Datos inválidos para crear asientos');
      }

      const seatsToCreate = [];

      for (let i = start; i <= end; i++) {
        seatsToCreate.push({
          seatNumber: `${prefix}${i}`,
          idSection,
          isAvailable: 1
        });
      }

      const createdSeats = await Seat.bulkCreate(seatsToCreate, { transaction });
      await transaction.commit();
      return createdSeats;

    } catch (error) {
      await transaction.rollback();
      console.error('Error al crear asientos en rango:', error.message);
      throw new Error('No se pudieron crear los asientos');
    }
  }
  
}


module.exports = SeatCreationDAO;
