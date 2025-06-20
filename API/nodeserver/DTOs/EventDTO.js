class EventDTO {
  constructor(idEvent, eventName, eventDate, eventCity, eventLocation, accesibility, isAvailable, idOwner, eventMap, eventPromotional) {
    this.idEvent = idEvent;
    this.eventName = eventName;
    this.eventDate = eventDate;
    this.eventCity = eventCity;
    this.eventLocation = eventLocation;
    this.accesibility = accesibility;
    this.isAvailable = isAvailable;
    this.idOwner = idOwner;
    this.eventMap = eventMap;
    this.eventPromotional = eventPromotional;
  }
}

module.exports = EventDTO;
