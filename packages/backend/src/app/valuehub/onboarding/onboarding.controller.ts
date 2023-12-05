/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { onboardingService } from './onboarding.service'

export const onboardingController = async (app: any) => {
    app.post('/', async (req: any, res: any) => {
        const onboarding = await onboardingService.create(req.body)
        res.status(200).send({ message: 'Fetched onboarding successfully', data: onboarding })
    })
    app.post('/get', async (req: any, res: any) => {
        const onboarding = await onboardingService.fetch(req.body)
        res.status(200).send({ message: 'Fetched onboarding successfully', data: !!onboarding?.id })
    })
}
