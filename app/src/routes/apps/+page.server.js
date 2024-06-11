import { pb } from '$lib/database'

/** @type {import('./$types').Actions} */
export const actions = {
    createCatagorie: async ({ locals, request }) => {
        const data = await request.formData();
        const cat = data.get('catagorie');
        const color = data.get('color')

        // validate catagorie
        if (!cat) {
            return fail(400, { cat, missing: true });
        }

        // add catagorie to db
        await pb.collection('task_catagories').create(
            {
                title: cat,
                user: locals.user.id,
                color
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

    changeCurrentCatagorie: async ({ request, locals }) => {
        const data = await request.formData();
        const cat = data.get('id');

        await locals.pb.collection('users').update(locals.user.id, { current_catagorie: cat })
    }
};