const { sequelize } = require('../models');
const Sale = require('../models/sale');
const SaleSeat = require('../models/saleSeat');
const { Op } = require('sequelize');

class SaleDAO {
  /**
   * Crea una venta y registra los asientos vendidos
   * @param {Object} saleData - Datos de la venta y los asientos
   * @param {number} saleData.idClient
   * @param {number} saleData.idEvent
   * @param {number} saleData.total
   * @param {Array<{idSection: number, seat: string}>} saleData.seatsSold
   */
  static async createSaleWithSeats({ idClient, idEvent, total, typePayment, seatsSold }) {

    const transaction = await sequelize.transaction();

    try {
      let uniqueOrder;
      let attempts = 0;

      do {
        uniqueOrder = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const exists = await Sale.findOne({ where: { order: uniqueOrder }, transaction });
        if (!exists) break;
        attempts++;
      } while (attempts < 10);

      if (attempts === 10) {
        throw new Error('No se pudo generar un número de orden único');
      }

      const newSale = await Sale.create(
        {
          idClient,
          idEvent,
          total,
          order: uniqueOrder,
          typePayment
        },
        { transaction }
      );

      const seatRecords = seatsSold.map(seatData => ({
        idSection: seatData.idSection,
        seat: seatData.seat,
        idSale: newSale.idSale
      }));

      await SaleSeat.bulkCreate(seatRecords, { transaction });

      await transaction.commit();
      return newSale;

    } catch (error) {
      await transaction.rollback();
      console.error('Error en createSaleWithSeats:', error.message);
      throw new Error('No se pudo registrar la venta');
    }
  }
}

module.exports = SaleDAO;
