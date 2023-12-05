/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { databaseConnection } from '../../database/database-connection'
import { OnboardingEntity } from './onboarding.entity'

const onboardingRepo = databaseConnection.getRepository(OnboardingEntity)
export type createOnboardingType = {
    userId: string
}

export const onboardingService = {
    async create({ userId }: createOnboardingType) {
        onboardingRepo.save({ userId })
        return 'Created'
    },
    async fetch({ userId }: createOnboardingType) {
        return await onboardingRepo.findOne({ where: { userId } })
    },
    
}
