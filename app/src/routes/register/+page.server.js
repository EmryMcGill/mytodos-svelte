import { fail } from '@sveltejs/kit'
import { pb } from '$lib/database'
import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ locals, request }) => {
        // get the form data
        const formData = await request.formData()

        // get the form fields
        const email = formData.get('email')
        const password = formData.get('password')
        const password2 = formData.get('password2')

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

        // check if password2 is ok
        if (!password2 || typeof password2 !== 'string') {
            errors.password2 = 'passowrd required'
        }

        // if there are any errors return a fail
        if (Object.keys(errors).length) {
            return fail(400, { errors })
        }

        // add user to db

        // create a data object for user data
        const data = {
            email: email,
            password: password,
            passwordConfirm: password2,
        };

        // try to create a user
        let successful = false
        try {
            const newUser = await locals.pb.collection('users').create(data)
            successful = true
            // create a default catagorie for the user
            const cat = await locals.pb.collection('task_catagories').create({ title: 'General', color: '#778899', user: newUser.id })
        }
        // catch any errors and display to browser
        catch (err) {
            if (err.response.data.email) {
                errors.email = err.response.data.email.message
                return fail(400, {
                    errors
                })
            }
            if (err.response.data.password) {
                errors.password = err.response.data.password.message
                return fail(400, {
                    errors
                })
            }
            if (err.response.data.passwordConfirm) {
                errors.password2 = err.response.data.passwordConfirm.message
                return fail(400, {
                    errors
                })
            }
        }

        // if successful redirect to login page
        if (successful) {
            throw redirect(303, '/login')
        }
    }
};