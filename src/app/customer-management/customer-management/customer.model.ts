export class Customer {
    _id: string;
    customerName: string;
    mobileNumber: string;
    whatsAppNo: string;
    landLine: string;
    email: string;
    companyName: string;
    companyAddress: string;
    location: string;
    gstNumber: string;
    customerGrade: string;
    brandName: string;
    constructor(
        customerName: string,
        mobileNumber: string,
        whatsAppNo: string,
        landLine: string,
        email: string,
        companyName: string,
        companyAddress: string,
        location: string,
        gstNumber: string,
        customerGrade: string,
        brandName: string
    ) {
        this.customerName = customerName;
        this.mobileNumber = mobileNumber;
        this.whatsAppNo = whatsAppNo;
        this.landLine = landLine;
        this.email = email;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.location = location;
        this.gstNumber = gstNumber;
        this.customerGrade = customerGrade;
        this.brandName = brandName;
    }
}
