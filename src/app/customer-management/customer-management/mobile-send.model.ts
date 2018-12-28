export class MobileSend {
    mobileNumber: [string];
    message: string;
    constructor(
        mobileNumber: [string],
        message: string,
    ) {
        this.mobileNumber = mobileNumber;
        this.message = message;
    }
}
