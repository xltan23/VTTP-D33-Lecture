export interface Task {
    task:string,
    priority:string
}

export interface Todo {
    name:string,
    email:string,
    comments?:string,
    tasks:Task[]
}