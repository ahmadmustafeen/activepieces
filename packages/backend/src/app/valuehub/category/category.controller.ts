/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { categoryService } from './category.service'

export const categoryController = async (app: any) => {
    app.get('/', async (req: any, res: any) => {
        const goals = await categoryService.fetchAllCategory()
        res.status(200).send({ message: 'Fetched Category successfully', data: goals.reverse() })
    })
}
