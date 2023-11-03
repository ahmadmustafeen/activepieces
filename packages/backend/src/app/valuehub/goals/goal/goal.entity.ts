import { EntitySchema } from 'typeorm'

export type GoalSchema = {
    id: string
    createdBy: string
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
}

export const GoalEntity = new EntitySchema<GoalSchema>({
    name: 'goal',
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
    },
   
})
