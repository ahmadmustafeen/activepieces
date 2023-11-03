import { FastifyPluginAsync } from 'fastify'
import { valuehubController } from './valuehub-controller'

export const valuehubModule: FastifyPluginAsync = async (app) => {
    await app.register(valuehubController)
}
