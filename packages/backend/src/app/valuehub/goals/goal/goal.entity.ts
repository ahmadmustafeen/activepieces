import { EntitySchema } from 'typeorm'

export type GoalSchema = {
    id: string
    createdBy: string
    title: string
    description: string
    category: string
    createdAt: Date
    updatedAt: Date
}

export const GoalEntity = new EntitySchema<GoalSchema>({
    name: 'valuehub_goal',
    columns: {
        id: {
            type: Number,
            primary: true,
        },
        title: {
            type: String,
        },
        createdBy: {
            type: String,
        },
        description: {
            type: String,
        },
        category: {
            type: String,
        },
    },
   
})
