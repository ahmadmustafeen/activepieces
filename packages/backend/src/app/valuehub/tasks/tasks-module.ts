import { FastifyPluginAsync } from 'fastify'
import { taskController } from './tasks-controller'

export const taskModule: FastifyPluginAsync = async (app) => {
    await app.register(taskController)
}
