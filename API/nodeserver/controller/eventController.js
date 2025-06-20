const { response } = require('express');
const fs = require('fs'); 
const path = require('path');
const EventDAO = require('../dataaccessobjects/EventDAO');

const createEvent = async (req, res) => {
  try {
    const { eventName, description, eventDate, eventLocation, eventCity, idOwner, accesibility } = req.body;

    // Verificar si los archivos fueron cargados correctamente
    const eventMap = req.files ? req.files.eventMap : null;  // Accede al archivo
    const eventPromotional = req.files ? req.files.eventPromotional : null;

    if (!eventName || !description || !eventDate || !eventLocation || !eventCity || !idOwner || !eventMap || !eventPromotional) {
      return res.status(400).json({ message: 'Todos los campos del evento son obligatorios' });
    }

    // Convertir las imágenes a BLOB (buffer)
    const eventMapBuffer = eventMap ? eventMap.data : null;
    const eventPromotionalBuffer = eventPromotional ? eventPromotional.data : null;

    // Crear evento
    const newEvent = await EventDAO.createEvent({
      eventName,
      description,
      eventDate,
      eventLocation,
      eventCity,
      accesibility,
      isAvailable: 'Activo',
      idOwner,
      eventMap: eventMapBuffer,  // Almacenar como BLOB
      eventPromotional: eventPromotionalBuffer  // Almacenar como BLOB
    });

    return res.status(201).json({
      message: 'Evento creado exitosamente',
      event: newEvent
    });

  } catch (error) {
    console.error('Error en createEvent:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { idEvent } = req.params;
    const { eventName, description, eventDate, eventLocation, eventCity, isAvailable, accesibility, eventMap, eventPromotional } = req.body;

    if (!idEvent || (!eventName && !description && !eventDate && !eventLocation && !eventCity && !isAvailable && !accesibility && !eventMap && !eventPromotional)) {
      return res.status(400).json({ message: 'Datos insuficientes para actualizar el evento' });
    }

    const success = await EventDAO.updateEvent({
      idEvent,
      eventName,
      description,
      eventDate,
      eventLocation,
      eventCity,
      isAvailable,
      accesibility,
      eventMap,
      eventPromotional
    });

    if (!success) {
      return res.status(404).json({ message: 'Evento no encontrado o sin cambios' });
    }

    return res.status(200).json({ message: 'Evento actualizado correctamente' });

  } catch (error) {
    console.error('Error en updateEvent:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getAllAvailableEvents = async (req, res) => {
  try {
    // Primero, actualizamos eventos expirados antes de listar los disponibles
    await EventDAO.expirePastEvents();

    const events = await EventDAO.getAllAvailableEvents();
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error en getAllAvailableEvents:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getEventsByOwner = async (req, res) => {
  try {
    const { idOwner } = req.params;

    if (!idOwner) {
      return res.status(400).json({ message: 'ID del propietario requerido' });
    }

    const events = await EventDAO.getEventsByOwner(idOwner);
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error en getEventsByOwner:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getEventsWithAccessibility = async (req, res) => {
  try {
    const events = await EventDAO.getEventsWithAccessibility();
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error en getEventsWithAccessibility:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const { response } = require('express');
const EventDAO = require('../dataaccessobjects/EventDAO');

const getLastFiveEvents = async (req, res) => {
  try {
    const events = await EventDAO.getLastFiveEvents();
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error en getLastFiveEvents:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getAllAvailableEvents,
  getEventsByOwner,
  getEventsWithAccessibility,
  getLastFiveEvents
};
