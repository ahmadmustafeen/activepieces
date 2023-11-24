/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { databaseConnection } from '../../../database/database-connection'
import { categoryService } from '../../category/category.service'
import { GoalEntity } from './goal.entity'

const goalRepo = databaseConnection.getRepository(GoalEntity)


type igoaldata =  {
    createdBy: string
    title: string
    description: string
    category: string
}

export const goalService = {
    async create(goaldata: igoaldata) {
        const { createdBy, title, description, category } = goaldata
        const goal = {
            createdBy,
            title,
            category,
            description,
        }
        return goalRepo.save(goal)
    },
    
    async update(id: number, goaldata: igoaldata) {
        const { createdBy, title, description } = goaldata
        const goal = {
            createdBy,
            title,
            description,
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
            updatedGoal.push({ ...eachGoal, category: categoryArray })
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
        goal.description =  JSON.parse(goal.description)
        return { ...goal, category: categoryArray }
    },

    
}
