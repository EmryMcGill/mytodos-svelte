import { fail } from '@sveltejs/kit'
import { pb } from '$lib/database'
import { redirect } from '@sveltejs/kit'


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ locals, cookies, request }) => {
        // get the form data
        const formData = await request.formData()

        // get the form fields
        const email = formData.get('email')
        const password = formData.get('password')

        // validate data

        const errors = {}

        // check if email is ok
        if (!email || typeof email !== 'string') {
            errors.email = 'email required'
        }

        // check if password is ok
        if (!password || typeof password !== 'string') {
            errors.password = 'passowrd required'
        }

        // if there are any errors return a fail
        if (Object.keys(errors).length) {
            return fail(400, { errors })
        }

        // try to log user in
        let successful = false
        try {
            const user = await locals.pb.collection('users').authWithPassword(email, password)
            successful = true
        }
        // catch any errors and display to browser
        catch (err) {
            return fail(400, { errors: { auth: 'invalid email or password' } })
        }

        // if successful redirect to login page
        if (successful) {
            throw redirect(302, '/')
        }
    }
};