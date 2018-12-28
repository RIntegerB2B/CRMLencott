export class Vendor {
    _id: string;
    vendorName: string;
    mobileNumber: string;
    whatsAppNo: string;
    landLine: string;
    email: string;
    vendorService: string;
    address: string;
    vendorCompanyName: string;
    companyAddress: string;
    location: string;
    gstNumber: string;
    vendorGrade: string;
    constructor(
        vendorName: string,
        mobileNumber: string,
        whatsAppNo: string,
        landLine: string,
        email: string,
        vendorService: string,
        address: string,
        vendorCompanyName: string,
        companyAddress: string,
        location: string,
        gstNumber: string,
        vendorGrade: string
    ) {
        this.vendorName = vendorName;
        this.mobileNumber = mobileNumber;
        this.whatsAppNo = whatsAppNo;
        this.landLine = landLine;
        this.email = email;
        this.vendorService = vendorService;
        this.address = address;
        this.vendorCompanyName = vendorCompanyName;
        this.companyAddress = companyAddress;
        this.location = location;
        this.gstNumber = gstNumber;
        this.vendorGrade = vendorGrade;
    }
}
