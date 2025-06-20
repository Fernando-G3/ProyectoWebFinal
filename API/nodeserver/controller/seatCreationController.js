const seatCreationDAO = require('../dataaccessobjects/SeatCreationDAO');

const createSections = async (req, res) => {
  try {
    const { sections, idEvent } = req.body;

    if (!sections || !Array.isArray(sections) || !idEvent) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }

    const createdSections = [];

    for (const s of sections) {
      const section = await seatCreationDAO.createSection({
        section: s.section,
        price: s.price,
        idEvent
      });
      createdSections.push(section);
    }

    return res.status(201).json({
      message: 'Secciones creadas correctamente',
      sections: createdSections
    });

  } catch (error) {
    console.error('❌ Error en createSections:', error.message);
    return res.status(500).json({ message: 'Error al crear las secciones' });
  }
};

const createSeats = async (req, res) => {
  try {
    const { seatsData } = req.body;

    if (!Array.isArray(seatsData) || seatsData.length === 0) {
      return res.status(400).json({ message: 'Datos de asientos inválidos' });
    }

    for (const seatGroup of seatsData) {
      const { prefix, quantity, idSection } = seatGroup;

      if (!prefix || !quantity || !idSection) {
        return res.status(400).json({ message: 'Datos faltantes en una sección' });
      }

      await seatCreationDAO.createSeatsInRange(prefix, 1, quantity, idSection);
    }

    return res.status(201).json({ message: 'Asientos creados correctamente' });

  } catch (error) {
    console.error('❌ Error en createSeats:', error.message);
    return res.status(500).json({ message: 'Error al crear los asientos' });
  }
};



module.exports = {
  createSections,
  createSeats
};