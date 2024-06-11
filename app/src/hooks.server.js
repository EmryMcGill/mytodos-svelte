import PocketBase from 'pocketbase'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // create a connection to the database
    event.locals.pb = new PocketBase('http://127.0.0.1:8090')

    // load the current user from cookie
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    // if user exists make a shortcut
    if (event.locals.pb.authStore.isValid) {
        event.locals.user = event.locals.pb.authStore.model
    }

    // create the response
    const response = await resolve(event)

    // set the cookie to the client
    // TODO: secure for production
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie(),
        { secure: false })

    return response
}