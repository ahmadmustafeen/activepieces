import { FastifyPluginAsync } from 'fastify'
import { categoryController } from './category.controller'

export const categoryModule: FastifyPluginAsync = async (app) => {
    await app.register(categoryController)
}
