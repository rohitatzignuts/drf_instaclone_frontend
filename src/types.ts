export interface User {
    id?: number
    username: string,
    password?: string,
    email?: string,
    first_name?: string,
    last_name?: string,
    profile_pic?: any
}

export interface Comment {
    id?: number
    content: string,
    created_at?: string,
    post?: number,
    user?: User,
}

export interface Post {
    id?: number
    user?: User
    image: any,
    caption: string,
    likes: Array<number>
    comments: Array<Comment>
}