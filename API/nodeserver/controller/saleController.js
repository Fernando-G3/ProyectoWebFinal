const { response } = require('express');
const SaleDAO = require('../dataaccessobjects/SaleDAO');

const createSale = async (req, res) => {
  try {
    const { idClient, idEvent, total, typePayment, seatsSold } = req.body;

    // Validación básica
    if (!idClient || !idEvent || !total || !typePayment || !Array.isArray(seatsSold) || seatsSold.length === 0) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios y debe haber al menos un asiento' });
    }

    // Validar cada asiento
    for (const seat of seatsSold) {
      if (!seat.idSection || !seat.seat) {
        return res.status(400).json({ message: 'Cada asiento debe tener idSection y seat' });
      }
    }

    const newSale = await SaleDAO.createSaleWithSeats({
      idClient,
      idEvent,
      total,
      typePayment,
      seatsSold
    });

    return res.status(201).json({
      message: 'Venta registrada exitosamente',
      sale: newSale
    });

  } catch (error) {
    console.error('Error en createSale:', error.message);
    return res.status(500).json({
      message: 'Error al registrar la venta',
      error: error.message
    });
  }
};

module.exports = {
  createSale
};
