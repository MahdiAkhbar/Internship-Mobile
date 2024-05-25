export interface IPortfoy {
    name: string;
    count: number;
    lastPrice: number;
    profitOrLoss: number;
    finishPrice: number;
    change: {
        value: number;
        viewValue: number;
    };
    currentValue: number;
}