export class Employee {
    _id: string;
    empName: string;
    empNo: string;
    gender: string;
    email: string;
    mobileNumber: string;
    whatsAppNo: string;
    dateOfJoin: string;
    dateOfBirth: string;
    designation: string;
    address: string;
    constructor(
        empName: string,
        empNo: string,
        gender: string,
        email: string,
        mobileNumber: string,
        whatsAppNo: string,
        dateOfBirth: string,
        dateOfJoin: string,
        designation: string,
        address: string
    ) {
        this.empName = empName;
        this.empNo = empNo;
        this.gender = gender;
        this.email = email;
        this.dateOfJoin = dateOfJoin;
        this.mobileNumber = mobileNumber;
        this.whatsAppNo = whatsAppNo;
        this.dateOfBirth = dateOfBirth;
        this.designation = designation;
        this.address = address;
    }
}
