/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { goalModule } from './goals/goal-module'
import { taskModule } from './tasks/tasks-module'


export const valuehubController = async (app: any) => {
    await app.register(goalModule, { prefix: '/v1/valuehub/goals' })
    await app.register(taskModule, { prefix: '/v1/valuehub/tasks' })
}
