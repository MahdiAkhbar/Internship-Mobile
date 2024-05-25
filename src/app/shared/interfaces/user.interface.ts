export interface IUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: {
        userName: string,
        roleName: string
    }[];
    favorites: {
        id: number,
        insCode: string
    }[];
    notes: {}[];
}