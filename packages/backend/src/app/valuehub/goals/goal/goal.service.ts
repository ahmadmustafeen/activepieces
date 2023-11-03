/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { databaseConnection } from '../../../database/database-connection'
import { GoalEntity } from './goal.entity'

const goalRepo = databaseConnection.getRepository(GoalEntity)


type igoaldata =  {
    createdBy: string
    title: string
    description: string
}

export const goalService = {
    async create(goaldata: igoaldata) {
        const { createdBy, title, description } = goaldata
        const goal = {
            createdBy,
            title,
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
        return goalRepo.find()
    },

    async fetchGoalById(id: string) {
        return goalRepo.findOne({ where: { id } })
    },
    
}
