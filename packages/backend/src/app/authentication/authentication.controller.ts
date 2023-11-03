import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { SignInRequest, SignUpRequest } from '@activepieces/shared'
import { authenticationService } from './authentication.service'
import {  FastifyRequest } from 'fastify'

export const authenticationController: FastifyPluginAsyncTypebox = async (app) => {
    app.post(
        '/sign-up',
        {
            schema: {
                body: SignUpRequest,
            },
        },
        async (request: FastifyRequest<{ Body: SignUpRequest }>) => {
            return authenticationService.signUp(request.body)
        },
    )

    app.post(
        '/sign-in',
        {
            schema: {
                body: SignInRequest,
            },
        },
        async (request: FastifyRequest<{ Body: SignInRequest }>) => {
            return authenticationService.signIn(request.body)
        },
    )

}
