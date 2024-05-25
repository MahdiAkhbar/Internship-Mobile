export interface IChart {
    "symbol": string;
    "eventDate": number;
    "tradesCount": number;
    "tradesVolume": number;
    "tradesValue": number;
    "insCode": string;
    "company": string;
    "closePrice": number;
    "finalTradePrice": number;
    "priceChange": number;
    "minPrice": number;
    "maxPrice": number;
    "firstPrice": number;
    "priceYesterday": number;
    "lastStatus": number;
    "eventClock": number;
};