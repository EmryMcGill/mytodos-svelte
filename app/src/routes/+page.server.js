import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    return { user: locals.user }
};

/** @type {import('./$types').Actions} */
export const actions = {
    logout: async ({ locals }) => {
        locals.pb.authStore.clear()
        throw redirect(303, '/login')
    }
}
