export type IUser = {
    id?: string
    name: string
    password: string

}
export type IUserPub = Omit<IUser, "password">