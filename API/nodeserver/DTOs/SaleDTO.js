class SaleDTO {
    constructor(idSale, idClient, idEvent, total, order, typePayment) {
        this.idSale = idSale;
        this.idClient = idClient;
        this.idEvent = idEvent;
        this.total = total;
        this.order = order;
        this.typePayment = typePayment;
    }
}

module.exports = SaleDTO;
