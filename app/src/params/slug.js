/** @type {import('@sveltejs/kit').ParamMatcher} */
export const match = (param) => {
    return /^[a-z0-9-]+$/.test(param)
}