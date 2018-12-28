export class SmsReport {
    date: Date;
    smsHeader: string;
    smsBody: string;
    mobileNumber: string;
    smsStatus: string;
    constructor(
        date: Date,
    smsHeader: string,
    smsBody: string,
    mobileNumber: string,
    smsStatus: string ) {
    this.date = date;
    this.smsHeader = smsHeader;
    this.smsBody = smsBody;
    this.mobileNumber = mobileNumber;
    this.smsStatus = smsStatus;
    }
}
