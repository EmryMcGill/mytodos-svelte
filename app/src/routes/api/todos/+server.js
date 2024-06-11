import { pb } from '$lib/database'
import { json } from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async (event) => {
    const todos = await pb.collection('tasks').getFullList()

    event.setHeaders({
        'Cache-Control': 'max-age=60'
    })

    return json(todos)
}


/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async (event) => {
    const data = await event.request.formData()
    const todo = data.get('todo')

    // do logic
    console.log(todo)

    // check if todo is empty
    if (!todo) {
        return json({ success: false, errors: { todo: 'Todo cannot be empty' } })
    }

    // add todo to db
    await pb.collection('tasks').create({ title: todo });

    return json({ success: true, errors: {} })
}


/** @type {import('@sveltejs/kit').RequestHandler} */
export const DELETE = async (event) => {
    const data = await event.request.formData()
    const id = data.get('id')

    // do logic
    console.log(id)

    // delete todo from db
    await pb.collection('tasks').delete(id);

    return json({ success: true, errors: {} })
}