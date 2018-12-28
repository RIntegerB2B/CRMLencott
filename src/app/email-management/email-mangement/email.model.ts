export class EmailSend {
    email: [string];
    emailMessage: string;
    subjectTitle: string;
    constructor(
        email: [string],
        emailMessage: string,
        subjectTitle: string,
    ) {
        this.email = email;
        this.emailMessage = emailMessage;
        this.subjectTitle = subjectTitle;
    }
}
