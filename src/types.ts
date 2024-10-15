export interface User {
    id?: string | number
    username: string,
    password: string,
    email?: string,
    first_name?: string,
    last_name?: string,
}

export interface Post {
    id?: string | number
    user?: User
    image: unknown,
    caption: string,
}