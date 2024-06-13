<script>
    // import stuff
    import { enhance } from "$app/forms";
    import Icon from "@iconify/svelte";
    import TodoCard from "../../../components/TodoCard.svelte";
    import Flatpickr from "svelte-flatpickr";
    import "flatpickr/dist/flatpickr.css";
    import { onMount } from "svelte";

    // get the page data
    /** @type {import('./$types').PageData} */
    export let data;

    // get the action form data
    /** @type {import('./$types').ActionData} */
    export let form;

    let loading = false;
    let dueDateStr = "";
    let dueDate;

    // functions

    // before form submits
    const beforeSubmit = ({ formData }) => {
        // turn loading on while waiting for form to submit
        loading = true;

        // give the date to the form data
        formData.append("date", dueDate);
        formData.append("dateStr", dueDateStr);
        dueDate = null;
        dueDateStr = "";

        // turn loading off after form submits
        return async ({ update }) => {
            loading = false;
            await update();
        };
    };

    onMount(() => {
        document.getElementById("date-picker").flatpickr({
            enableTime: true,
            dateFormat: "M d, Y",
            onChange: (selectedDates, dateStr, instance) => {
                dueDate = selectedDates[0];
                instance.close();
                dueDateStr = new Date(dateStr).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });
            },
        });
    });
</script>

<h1>My Todos</h1>

<form
    class="form-container"
    method="POST"
    action="?/createTodo"
    id="todo-form"
    use:enhance={beforeSubmit}
>
    <button type="submit">+ Add Task</button>
    <input type="text" name="todo" placeholder="Todo Name" autofocus />

    <div class="flatpickr" id="date-picker">
        {#if dueDateStr}
            <p class="date-text">{dueDateStr}</p>
        {/if}
        <input
            disabled
            class="cal-input"
            type="text"
            bind:value={dueDateStr}
            data-input
        />
        <button class="cal-btn" type="button" data-toggle
            ><Icon icon="carbon:calendar" /></button
        >
    </div>
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

    .flatpickr {
        display: flex;
    }

    .cal-input {
        display: none;
    }

    .cal-btn {
        padding: 0.5rem;
        margin-left: 0.5rem;
    }

    .date-text {
        text-wrap: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.5rem;
    }
</style>
