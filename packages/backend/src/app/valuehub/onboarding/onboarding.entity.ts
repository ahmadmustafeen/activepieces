import { EntitySchema } from 'typeorm'

export type OnboardingSchema = {
    id: string
    userId: string
}

export const OnboardingEntity = new EntitySchema<OnboardingSchema>({
    name: 'valuehub_onboarding',
    columns: {
        id: {
            type: Number,
            primary: true,
        },
        userId: {
            type: String,
        },
    },
   
})
