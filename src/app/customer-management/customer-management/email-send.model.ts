export class EmailSend {
    email: [string];
    emailMessage: string;
    constructor(
        email: [string],
        emailMessage: string,
    ) {
        this.email = email;
        this.emailMessage = emailMessage;
    }
}
