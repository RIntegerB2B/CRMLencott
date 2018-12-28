export class PaginationModel {
    _id: string;
    customerName: string;
    mobileNumber: string;
    whatsAppNo: string;
    landLine: string;
    email: string;
    location: string;
    companyName: string;
    companyAddress: string;
    gstNumber: string;
    customerGrade: string;
    brandName: string;
    constructor(
        customerName: string,
        mobileNumber: string,
        whatsAppNo: string,
        landLine: string,
        email: string,
        location: string,
        companyName: string,
        companyAddress: string,
        gstNumber: string,
        customerGrade: string,
        brandName: string
    ) {
        this.customerName = customerName;
        this.mobileNumber = mobileNumber;
        this.whatsAppNo = whatsAppNo;
        this.landLine = landLine;
        this.email = email;
        this.location = location;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.gstNumber = gstNumber;
        this.customerGrade = customerGrade;
        this.brandName = brandName;
    }
}
