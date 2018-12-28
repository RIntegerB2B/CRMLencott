export class AlertBox {
    displayClass: string;
    modalHeader: string;
    modalBody: string;
    constructor(displayClass: string,
        modalHeader: string,
        modalBody: string) {
        this.displayClass = displayClass;
        this.modalBody =  modalBody;
        this.modalHeader = modalHeader;
    }
}
