/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { categoryService } from '../category/category.service'
import { goalService } from './goal/goal.service'

export const goalController = async (app: any) => {
    app.get('/', async (req: any, res: any) => {
        const goals = await goalService.fetchAllGoals()
        const updatedGoal = []
        for (const eachGoal of goals) {
            const categoryArray = []
            for (const category of JSON.parse(eachGoal.category)) {
                const categoryData = await categoryService.fetchCategoryById(category)
                if (categoryData) categoryArray.push(categoryData)
            }
            updatedGoal.push({ ...eachGoal, category: categoryArray })
        }
        res.status(200).send({ message: 'Fetched goals successfully', data: updatedGoal.reverse() })
    })
    app.post('/', async (req: any, res: any) => {
        const goal = await goalService.create(req.body)
        res.status(201).send({ message: 'Goal is created', data: goal })
    })
    app.put('/', (req: any, res: any) => {
        const { id, data } = req.body
        const goal = goalService.update(id, data)
        res.status(200).send({ message: 'Goal is updated successfully', data: goal })
    })

    app.post('/delete', (req: any, res: any) => {
        const { id } = req.body
        const goal = goalService.delete(id)
        res.status(200).send({ message: 'Goal is deleted successfully', data: goal })
    })
}
