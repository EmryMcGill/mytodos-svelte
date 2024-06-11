import { pb } from '$lib/database'
import { json } from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async (event) => {
    const posts = await pb.collection('posts').getFullList()

    event.setHeaders({
        'Cache-Control': 'max-age=60'
    })

    return json(posts)
}




/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async (event) => {
    const data = await event.request.formData()
    const email = data.get('email')

    // do logic
    console.log(email)

    return new Response(
        JSON.stringify({ success: true }), 
        {
            headers: {
                'Content-Type': 'application/json',
        }
    })
}