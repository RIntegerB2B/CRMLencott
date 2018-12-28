export class Others {
    _id: string;
    name: string;
    gender: string;
    email: string;
    mobileNumber: string;
    location: string;
    address: string;
    constructor(
        name: string,
        gender: string,
        email: string,
        mobileNumber: string,
        location: string,
        address: string
    ) {
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.location = location;
        this.address = address;
    }
}
