/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { databaseConnection } from '../../../database/database-connection'
import { categoryService } from '../../category/category.service'
import { GoalEntity } from './goal.entity'

const goalRepo = databaseConnection.getRepository(GoalEntity)


type igoaldata =  {
    createdBy: string
    title: string
    description: string[]
    category: string[]
}

export const goalService = {
    async create(goaldata: igoaldata) {
        const { createdBy, title, description = [], category: categories } = goaldata
      
        const parsedCategory: string[] = []

        for (const category of categories) {
            const Category =  await categoryService.fetchCategoryByTitle(category.toLowerCase())
            if (Category) parsedCategory.push(Category.id)

            else {
                const createdCategory = await categoryService.create({ title: category.toLowerCase() })
                if (createdCategory?.id) parsedCategory.push(createdCategory.id)
            }
        }

        const goal = {
            createdBy,
            title,
            category: JSON.stringify(parsedCategory),
            description: JSON.stringify(description),
        }

        
        return goalRepo.save(goal)
    },
    
    async update(id: number, goaldata: igoaldata) {
        const { createdBy, title, description, category: categories = [] } = goaldata

        const parsedCategory: string[] = []

        for (const category of categories) {
            const Category =  await categoryService.fetchCategoryByTitle(category.toLowerCase())
            if (Category) parsedCategory.push(Category.id)

            else {
                const createdCategory = await categoryService.create({ title: category.toLowerCase() })
                if (createdCategory?.id) parsedCategory.push(createdCategory.id)
            }
        }

        const goal = {
            createdBy,
            title,
            description: description?.length ?  JSON.stringify(description) : undefined,
            category: parsedCategory.length ? JSON.stringify(parsedCategory) : undefined,
        }

        return goalRepo.update(id, goal)
    },

    async delete(id: number) {
        return goalRepo.delete(id)
    },

    async fetchAllGoals() {
        const goals = await goalRepo.find()
        const updatedGoal = []
        for (const eachGoal of goals) {
            const categoryArray = []
            for (const category of JSON.parse(eachGoal.category)) {
                const categoryData = await categoryService.fetchCategoryById(category)
                if (categoryData) categoryArray.push(categoryData)
            }
            updatedGoal.push({ ...eachGoal, category: categoryArray, description: JSON.parse(eachGoal.description) })
        }
        return updatedGoal
        
    },

    async fetchGoalById(id: string) {
        const goal = await goalRepo.findOne({ where: { id } })
        if (!goal) return null
        const categoryArray = []
        for (const category of JSON.parse(goal.category)) {
            const categoryData = await categoryService.fetchCategoryById(category)
            if (categoryData) categoryArray.push(categoryData)
        }
        return { ...goal, category: categoryArray, description: JSON.parse(goal.description) }
    },

    
}
