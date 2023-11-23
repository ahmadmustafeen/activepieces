import { EntitySchema } from 'typeorm'

export type CategorySchema = {
    id: string
    title: string
}

export const CategoryEntity = new EntitySchema<CategorySchema>({
    name: 'valuehub_category',
    columns: {
        id: {
            type: Number,
            primary: true,
        },
        title: {
            type: String,
        },
    },
   
})
