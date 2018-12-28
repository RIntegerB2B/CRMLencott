export class B2cMarket {
    _id: string;
    customerName: string;
    gender: string;
    mobileNumber: string;
    email: string;
    dateOfBirth: string;
    nationality: string;
    categoryType: string;
    designation: string;
    location: string;
    selection: boolean;
    constructor(
        customerName: string,
        gender: string,
        mobileNumber: string,
        email: string,
        dateOfBirth: string,
        nationality: string,
        categoryType: string,
        designation: string,
        location: string
    ) {
        this.customerName = customerName;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.designation = designation;
        this.categoryType = categoryType;
        this.location = location;
    }
}
