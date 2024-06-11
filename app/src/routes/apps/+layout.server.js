import { pb } from '$lib/database';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, event }) {

    // get the catagories from database
    const catagories = await pb.collection('task_catagories').getFullList(
        { filter: `user = "${locals.user.id}"` }
    )

    // get user from locals
    const user = locals.user;

    let current_catagorie = user.current_catagorie;

    // check if user has a current catagorie
    if (!current_catagorie) {
        await locals.pb.collection('users').update(user.id, { current_catagorie: catagories[0].id })
        current_catagorie = catagories[0].id
    }

    return { user: locals.user, catagories: catagories, current_catagorie }


};

