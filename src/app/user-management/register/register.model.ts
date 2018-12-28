
export class Register {
    userName: string;
    password: string;
    mobileNumber: number;
    email: string;
    userType: string;
    smsPermission?: boolean;
    emailPermission?: boolean;
    editPermission?: boolean;
    deletePermission?: boolean;
    constructor(
        userName: string,
        password: string,
        mobileNumber: number,
        email: string,
        userType: string,
        smsPermission?: boolean,
    emailPermission?: boolean,
    editPermission?: boolean,
    deletePermission?: boolean
        ) {
        this.userName = userName;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.userType = userType;
        this.smsPermission = smsPermission;
        this.emailPermission = emailPermission;
        this.editPermission = editPermission;
        this.deletePermission = deletePermission;
    }
}
