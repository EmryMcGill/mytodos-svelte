<script>
    // import stuff
    import { enhance } from "$app/forms";
    import Icon from "@iconify/svelte";
    import TodoCard from "../../../components/TodoCard.svelte";

    // get the page data
    /** @type {import('./$types').PageData} */
    export let data;

    // get the action form data
    /** @type {import('./$types').ActionData} */
    export let form;

    let loading = false;

    // functions

    // before form submits
    const beforeSubmit = () => {
        // turn loading on while waiting for form to submit
        loading = true;

        // turn loading off after form submits
        return async ({ update }) => {
            loading = false;
            await update();
        };
    };
</script>

<h1>My Todos</h1>

<form
    class="form-container"
    method="POST"
    action="?/createTodo"
    use:enhance={beforeSubmit}
>
    <button type="submit">+ Add Task</button>
    <input type="text" name="todo" placeholder="Todo Name" autofocus />
</form>
{#each data.todos as todo}
    <TodoCard {todo} />
    <div class="line-break"></div>
{/each}

<style>
    .form-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
    }

    .line-break:not(:last-child) {
        width: 100%;
        height: 1px;
        background-color: var(--lightgreyalt);
    }

    button {
        display: flex;
        align-items: center;
        border: 2px solid black;
        background-color: white;
        transition: 0.1s;
        font-weight: 700;
        margin-left: 0;
    }
    button:hover {
        cursor: pointer;
        background-color: black;
        color: white;
        transition: 0.1s;
    }

    input[type="text"] {
        width: 100%;
        font-family: "Poppins";
        font-size: 1em;
        padding: 0.3rem;
    }
</style>
