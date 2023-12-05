import { FastifyPluginAsync } from 'fastify'
import { onboardingController } from './onboarding.controller'

export const onboardingModule: FastifyPluginAsync = async (app) => {
    await app.register(onboardingController)
}
