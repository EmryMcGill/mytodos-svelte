import { pb } from '$lib/database';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    // check if user is signed in
    if (!locals.user) {
        throw redirect(303, '/login')
    }

    // get the users todos and catagories from the database
    const todos = await pb.collection('tasks').getFullList(
        { filter: `user = "${locals.user.id}" && catagorie = "${locals.user.current_catagorie}"` }
    )

    // return the data
    return { todos: todos };
};

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/** @type {import('./$types').Actions} */
export const actions = {
    createTodo: async ({ locals, request }) => {
        const data = await request.formData();
        const todo = data.get('todo');

        // validate todo
        if (!todo) {
            return fail(400, { todo, missing: true });
        }

        // add todo to db
        await pb.collection('tasks').create(
            {
                title: todo,
                user: locals.user.id,
                catagorie: locals.user.current_catagorie
            }
        );

        return { success: true }
    },

    deleteTodo: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');

        await pb.collection('tasks').delete(id);

        return { success: true }
    },

    updateTodo: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const todo = data.get('title');

        await pb.collection('tasks').update(id, { title: todo });

        return { success: true }
    },

    updateDueDate: async ({ request, locals }) => {
        // get the date from the form
        const data = await request.formData();
        const id = data.get('id');
        const date = data.get('date');

        console.log(await locals.pb.collection('tasks').update(id, { date: date }))

        // update the date for the task

        return { success: true }
    }
};