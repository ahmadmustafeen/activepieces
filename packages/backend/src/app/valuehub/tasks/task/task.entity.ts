import { EntitySchema } from 'typeorm'

export type TaskSchema = {
    id: string
    goalId: number
    title: string
    description: string
    priority: string
    complexity: string
    colourTag: string
    dueDate: string
    status: string
    type: string
    createdAt: Date
    updatedAt: Date
}

export const TaskEntity = new EntitySchema<TaskSchema>({
    name: 'task',
    columns: {
        id: {
            type: Number,
            primary: true,
        },
        goalId: {
            type: Number,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
        },
        complexity: {
            type: Number,
        },
        colourTag: {
            type: Number,
        },
        dueDate: {
            type: String,
        },
        status: {
            type: String,
        },
        type: {
            type: String,
        },

    },
   
})
