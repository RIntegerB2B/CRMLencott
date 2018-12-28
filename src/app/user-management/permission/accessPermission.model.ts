
export class AccessPermission {
    userType: string;
    currentDate: string;
    b2bCustomer: [string];
    b2bMarket: [string];
    b2cMarket: [string];
    b2cCustomer: [string];
    interB2bCustomer: [string];
    interB2bMarket: [string];
    interB2cMarket: [string];
    interB2cCustomer: [string];
    employee: [string];
    vendor: [string];
    agent: [string];
    others: [string];
    menuList: [string];
    mobilePermission: boolean;
    constructor(
        userType: string,
        currentDate: string,
        b2bCustomer: [string],
        b2bMarket: [string],
        b2cMarket: [string],
        b2cCustomer: [string],
        interB2bCustomer: [string],
        interB2bMarket: [string],
        interB2cMarket: [string],
        interB2cCustomer: [string],
        employee: [string],
        vendor: [string],
        agent: [string],
        others: [string],
        menuList: [string],
        mobilePermission: boolean
    ) {
        this.userType = userType;
        this.currentDate = currentDate;
        this.b2bCustomer = b2bCustomer;
        this.b2bMarket = b2bMarket;
        this.b2cMarket = b2cMarket;
        this.b2cCustomer = b2cCustomer;
        this.interB2bCustomer = interB2bCustomer;
        this.interB2bMarket = interB2bMarket;
        this.interB2cMarket = interB2cMarket;
        this.interB2cCustomer = interB2cCustomer;
        this.employee = employee;
        this.vendor = vendor;
        this.agent = agent;
        this.others = others;
        this.menuList = menuList;
        this.mobilePermission = mobilePermission;
    }
}
