import { FastifyPluginAsync } from 'fastify'
import { templateController } from './template.controller'

export const templateModule: FastifyPluginAsync = async (app) => {
    await app.register(templateController)
}
