export class Agent {
    _id: string;
    agentName: string;
    mobileNumber: string;
    whatsAppNo: string;
    landLine: string;
    email: string;
    agentService: string;
    address: string;
    agentCompanyName: string;
    companyAddress: string;
    location: string;
    gstNumber: string;
    agentGrade: string;
    constructor(
        agentName: string,
        mobileNumber: string,
        whatsAppNo: string,
        landLine: string,
        email: string,
        agentService: string,
        address: string,
        agentCompanyName: string,
        companyAddress: string,
        location: string,
        gstNumber: string,
        agentGrade: string
    ) {
        this.agentName = agentName;
        this.mobileNumber = mobileNumber;
        this.whatsAppNo = whatsAppNo;
        this.landLine = landLine;
        this.email = email;
        this.agentService = agentService;
        this.address = address;
        this.agentCompanyName = agentCompanyName;
        this.companyAddress = companyAddress;
        this.location = location;
        this.gstNumber = gstNumber;
        this.agentGrade = agentGrade;
    }
}
