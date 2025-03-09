import { Lessons } from "./Lessons"

export type Courses = {
    id: string,
    title: string,
    description: string,
    teacherId: string,
    lessons:Partial< Lessons>[]
}