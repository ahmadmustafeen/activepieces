/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { categoryModule } from './category/category.module'
import { goalModule } from './goals/goal-module'
import { onboardingModule } from './onboarding/onboading.module'
import { taskModule } from './tasks/tasks-module'


export const valuehubController = async (app: any) => {
    await app.register(goalModule, { prefix: '/v1/valuehub/goals' })
    await app.register(taskModule, { prefix: '/v1/valuehub/tasks' })
    await app.register(categoryModule, { prefix: '/v1/valuehub/category' })
    await app.register(onboardingModule, { prefix: '/v1/valuehub/onboarding' })
}
