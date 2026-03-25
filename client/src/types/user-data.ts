export type UserData = {
    id?: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
    token: string;
};

export type AuthData = {
    email: string;
    password: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    isPro: boolean;
}