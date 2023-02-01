export interface Roles {
    visitante ?: boolean;
    admin ?: boolean;
}

export interface Users {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    uid?: string;
    roles: Roles;

}
