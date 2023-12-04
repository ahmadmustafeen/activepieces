/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { goalService } from './goal/goal.service'

export const goalController = async (app: any) => {
    app.get('/', async (req: any, res: any) => {
        const goals = await goalService.fetchAllGoals()
        res.status(200).send({ message: 'Fetched goals successfully', data: goals.reverse() })
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

    app.post('/new', async (req: any, res: any)=>{
        const goal  = await goalService.createGoal(req.body)
        res.status(201).send(goal)
    })
}
