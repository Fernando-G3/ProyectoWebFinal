class SeatDTO {
    constructor(idSeat, seat, idSection, isAvailable) {
        this.idSeat = idSeat;
        this.seat = seat;
        this.idSection = idSection;
        this.isAvailable = isAvailable;
    }
}

module.exports = SeatDTO;
