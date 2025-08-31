
export enum Role {
    ADMIN = "admin",
    USER =  "user",
    AGENT = "agent"
}

export enum IsActive {
    ACTIVE = "active",
    INACTIVE = "inactive",
    BlOCKED = "blocked"
}

export interface IAuth {
    provider: "credentials" | "google";
    providerId: string;
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
    role: Role;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    auths: IAuth[];
}