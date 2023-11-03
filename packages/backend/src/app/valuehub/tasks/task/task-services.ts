/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { databaseConnection } from '../../../database/database-connection'
import { goalService } from '../../goals/goal/goal.service'
import { TaskEntity } from './task.entity'

const taskRepo = databaseConnection.getRepository(TaskEntity)


const PROMPT_MESSAGES = [{ role: ChatCompletionRequestMessageRoleEnum.System, content: `
You are a experienced Project Manager, and you will be given goals, for each goal, you will return a JSON of tasks.
All these task should be directing towards the main goal.


Please provide atleast 5 tasks. 
$goalId is a dynamic number value provided by the user. 
Return value of complexity, colourTag and dueDate as empty string.
Status should be "TODO" and type should be "BUG" and priority should be "3".
Fill out title and description.


Format for json would be as follow:

<json>
    [{
        "title":"Social Media Marketing",
        "description":"We will work on personal brand",
        goalId:$goalId,
        "priority":"",
        "complexity":"",
        "status:"",
        "type:"",
        "colourTag":"",
        "dueDate":""
    }]
</json>

` }]

const REGENERATE_PROMPT_MESSAGES = [{ role: ChatCompletionRequestMessageRoleEnum.System, content: `
You are a experienced Project Manager, and you will be given goals, for each goal, you will return a JSON of tasks.

Tasks given in <tasks></tasks> xml are task previously created by user.

All new task should be directing towards the main goal, keeping the task already created in mind.

Please provide atleast 3 new tasks. 
$goalId is a dynamic number value provided by the user. 
Return value of complexity, colourTag and dueDate as empty string.
Status should be "TODO" and type should be "BUG" and priority should be "3".
Fill out title and description.


Format for json would be as follow:

    [{
        "title":"Social Media Marketing",
        "description":"We will work on personal brand",
        goalId:$goalId,
        "priority":"",
        "complexity":"",
        "status:"",
        "type:"",
        "colourTag":"",
        "dueDate":""
    }]

` }]


export type itaskdata =  {
    id: string
    goalId: number
    title: string
    description: string
    priority: string
    complexity: string
    colourTag: string
    dueDate: string
    status: string
    type: string
}

const configuration =  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai =  new OpenAIApi(configuration)


const autoRegeneratedTaskPrompt = (tasksPrompt: string, goal: { title: string, description: string, id: string }) => `
Already Created Task are: <tasks>${tasksPrompt}</tasks>.

Title of Goal: ${goal.title}. Description of Goal: ${goal.description}. Goal Id is ${goal.id}`

export const taskService = {
    


    async create(taskdata: itaskdata) {
        const { 
            goalId,
            title,
            description,
            priority,
            complexity,
            colourTag,
            dueDate,
            status,
            type,
        } = taskdata
        const task = {
            goalId,
            title,
            description,
            type,
            priority,
            complexity,
            colourTag,
            dueDate,
            status,
        }
        return taskRepo.save(task)
    },
    
    async update(id: number, taskdata: itaskdata) {
        const { 
            title,
            description,
            priority,
            complexity,
            status,
            colourTag,
            dueDate,
            type,
        } = taskdata
        const task = {
            title,
            description,
            priority,
            complexity,
            colourTag,
            status,
            type,
            dueDate,
        }
        
        return taskRepo.update(id, task)
    },

    async delete(id: number) {
        return taskRepo.delete(id)
    },

    async fetchAllTask(id: number) {
        return taskRepo.find({ where: { goalId: id } })
    },


    async autoGeneratedTaskList(goalId: string) {

        const goal = await goalService.fetchGoalById(goalId)

        const completion = await openai.createChatCompletion({  model: 'gpt-3.5-turbo', messages: [ ...PROMPT_MESSAGES, { role: ChatCompletionRequestMessageRoleEnum.User, content: `Title of Goal: ${goal?.title}. Description of Goal: ${goal?.description}. Goal Id is ${goalId}` }] })
        
        const tasks = JSON.parse(completion.data.choices[0]?.message?.content ?? '')
        
        
        if (tasks?.tasks?.length) {
            for (const task of tasks.tasks) {
                await taskService.create(task)
            }
        }
        else if (tasks?.length) {
            for (const task of tasks) {
                await taskService.create(task)
            }
        }
        else {
            return { error: true, data: null, message: 'Something went wrong during parsing, data is not formated correctly' }
        }
        
        return { error: false, data: tasks, message: 'Successfully created and added Taks.' }
        
    },

    async autoRegeneratedTaskList(goalId: string) {
        const goal = await goalService.fetchGoalById(goalId)

        const previousTasks = await taskService.fetchAllTask(goal?.id ? parseInt(goal.id) : 1)


        let tasksPrompt = ''

        for (const task of previousTasks) {
            tasksPrompt += `Title: ${task.title} 
            Description: ${task.description}
            `
        }

        
        const completion = await openai.createChatCompletion({  model: 'gpt-3.5-turbo', max_tokens: 2000, messages: [ ...REGENERATE_PROMPT_MESSAGES, { role: ChatCompletionRequestMessageRoleEnum.User, content: autoRegeneratedTaskPrompt(tasksPrompt, { title: goal?.title ?? '', description: goal?.description ?? '', id: goalId }) }] })
        
        const tasks = JSON.parse(completion.data.choices[0]?.message?.content ?? '')

        if (tasks?.tasks?.length) {
            for (const task of tasks.tasks) {
                await taskService.create(task)
            }
        }
        else if (tasks?.length) {
            for (const task of tasks) {
                await taskService.create(task)
            }
        }
        else {
            return { error: true, data: null, message: 'Something went wrong during parsing, data is not formated correctly' }
        }
        
        return { error: false, data: tasks, message: 'Successfully created and added Taks.' }
    },
    
}


