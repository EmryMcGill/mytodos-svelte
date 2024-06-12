import { pb } from '$lib/database';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    // check if user is signed in
    if (!locals.user) {
        throw redirect(303, '/login')
    }

    // get the users todos from the database
    const todos = await pb.collection('tasks').getFullList(
        {
            filter: `user = "${locals.user.id}" && catagorie = "${locals.user.current_catagorie}"`,
            sort: 'dueDate'
        }
    )

    // return the data
    return { todos: todos };
};

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

        // delete todo from db
        await pb.collection('tasks').delete(id);

        return { success: true }
    },

    updateTodo: async ({ request }) => {
        // get the date from the form
        const data = await request.formData();
        const id = data.get('id');
        const title = data.get('title');

        console.log(title)

        // update the task title in the database
        await pb.collection('tasks').update(id, { title: title });

        return { success: true }
    },

    updateDueDate: async ({ request, locals }) => {
        // get the date from the form
        const data = await request.formData();
        const id = data.get('id');
        const date = data.get('date');

        // create a nice formate for the date
        const dateString = new Date(date).toLocaleDateString();

        // update the due date in the database
        await locals.pb.collection('tasks').update(id, { dueDate: new Date(date), dateString })

        return { success: true }
    }
};