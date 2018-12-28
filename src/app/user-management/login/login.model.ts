export class LogIn {
    userName: string;
    password: string;
    userType?: string;
    constructor(
        userName: string,
        password: string, userType?: string) {
        this.userName = userName;
        this.password = password;
        this.userType = userType;
    }
}
