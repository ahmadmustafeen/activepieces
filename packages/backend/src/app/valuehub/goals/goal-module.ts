import { FastifyPluginAsync } from 'fastify'
import { goalController } from './goal-controller'

export const goalModule: FastifyPluginAsync = async (app) => {
    await app.register(goalController)
}
