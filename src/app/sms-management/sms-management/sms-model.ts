export class MobileSend {
    mobileNumber: [string];
    smsBody: string;
    smsHeader: string;
    smsType: string;
    constructor(
        mobileNumber: [string],
        smsBody: string,
        smsHeader: string,
        smsType: string
    ) {
        this.mobileNumber = mobileNumber;
        this.smsBody = smsBody;
        this.smsHeader = smsHeader;
        this.smsType = smsType;
    }
}
