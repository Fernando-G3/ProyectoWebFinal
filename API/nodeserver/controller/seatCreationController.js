const seatCreationDAO = require('../dataaccessobjects/SeatCreationDAO');


const createSectionsWithSeats = async (req, res) => {
  try {
    const { sections, idEvent } = req.body;

    if (!sections || !Array.isArray(sections) || !idEvent) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }

    for (const s of sections) {
      const section = await seatCreationDAO.createSection({
        section: s.section,
        price: s.price,
        idEvent
      });

      await seatCreationDAO.createSeatsInRange(s.prefix, 1, s.quantity, section.idSaleSection);
    }

    return res.status(201).json({ message: 'Secciones y asientos creados correctamente' });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: 'Error al crear secciones y asientos' });
  }
};

module.exports = {
  createSectionsWithSeats
};