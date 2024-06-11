<script>
    import { enhance } from "$app/forms";

    // get the action form data
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<h1>Login</h1>

<form method="POST" use:enhance>
    <input type="text" name="email" placeholder="Email" />

    {#if form?.errors?.email}
        <p class="error">{form?.errors?.email}</p>
    {/if}

    <input type="password" name="password" placeholder="Password" />

    {#if form?.errors?.password}
        <p class="error">{form?.errors?.password}</p>
    {/if}

    {#if form?.errors?.auth}
        <p class="error">{form?.errors?.auth}</p>
    {/if}

    <button>Login</button>
</form>

<style>
    .error {
        color: tomato;
    }
</style>
