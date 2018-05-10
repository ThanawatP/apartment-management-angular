export class Rental {
    id: string;
    roomId: string;
    userId: string;
    electricityBill: {
        previousReading: Number;
        recentReading: Number;
        consumption: Number;
        rate: Number;
        cost: Number;
    }
    waterBill: {
        previousReading: Number;
        recentReading: Number;
        consumption: Number;
        rate: Number;
        cost: Number;
    }
    total: Number;
    rate: Number;
    status: string;
    billPeriod: string;
    createdAt?: Date;
    updatedAt?: Date;
}