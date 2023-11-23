/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { databaseConnection } from '../../database/database-connection'
import { CategoryEntity } from './category.entity'

const categoryRepo = databaseConnection.getRepository(CategoryEntity)


type icategorydata =  {
    title: string
}

export const categoryService = {
    async create(categoryData: icategorydata) {
        const { title } = categoryData
        const goal = {
            title,
        }
        await categoryRepo.save(goal)
        const cate =  await this.fetchCategoryByTitle(title)
        return cate
    },
    
    async update(id: number, goaldata: icategorydata) {
        const { title } = goaldata
        const goal = {
            title,
        }
        return categoryRepo.update(id, goal)
    },

    async delete(id: number) {
        return categoryRepo.delete(id)
    },

    async fetchAllCategory() {
        return categoryRepo.find()
    },

    async fetchCategoryById(id: string) {
        return categoryRepo.findOne({ where: { id } })
    },

    async fetchCategoryByTitle(title: string) {
        return categoryRepo.findOne({ where: { title } })
    },

    
}
