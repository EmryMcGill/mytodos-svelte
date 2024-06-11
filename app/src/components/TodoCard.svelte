<script>
    import { enhance } from "$app/forms";
    import Icon from "@iconify/svelte";
    import Flatpickr from "svelte-flatpickr";
    import "flatpickr/dist/flatpickr.css";
    import { onMount } from "svelte";

    export let todo;

    let toggleTitle = false;
    let completeHover = false;
    let newTitle = todo.title;
    const datePickerId = "date-picker" + todo.id;
    let dueDate = todo.date;

    const handleToggleTitle = () => (toggleTitle = !toggleTitle);

    const handleSubmit = () => {
        document.getElementById("title-form").submit();
    };

    onMount(() => {
        document.getElementById(datePickerId).flatpickr({
            enableTime: true,
            dateFormat: "M d, Y",
            onChange: (selectedDates, dateStr, instance) => {
                instance.close();
                // submit form to call a form action
                dueDate = dateStr;
                document.getElementById("due-date-form").requestSubmit();
            },
        });
    });
</script>

<div class="todo-card">
    <div class="complete-todo-form">
        <form method="POST" action="?/deleteTodo" use:enhance>
            <input type="hidden" name="id" value={todo.id} />
            <button
                class="complete-todo-btn"
                type="submit"
                on:mouseover={() => (completeHover = true)}
                on:mouseleave={() => (completeHover = false)}
                on:focus={() => (completeHover = true)}
                on:blur={() => (completeHover = false)}
            >
                {#if completeHover}
                    <Icon icon="carbon:checkmark-outline" />
                {:else}
                    <Icon icon="carbon:circle-outline" />
                {/if}
            </button>
        </form>
        {#if !toggleTitle}
            <button class="todo-title-btn" on:click={handleToggleTitle}>
                <span>{todo.title}</span>
            </button>
        {:else}
            <form
                id="title-form"
                method="POST"
                action="?/updateTodo"
                use:enhance={(formData) => {
                    // give the new date form data
                    formData.append("title", newTitle);
                }}
            >
                <input type="hidden" name="id" value={todo.id} />
                <input
                    class="title-input"
                    type="text"
                    bind:value={newTitle}
                    autofocus
                    on:focusout={handleSubmit}
                />
            </form>
        {/if}
    </div>
    <div class="action-btn-container">
        <form
            action="?/updateDueDate"
            method="POST"
            id="due-date-form"
            use:enhance={({ formData }) => {
                console.log("date", dueDate);
                formData.append("date", dueDate);
            }}
        >
            <input type="hidden" name="id" value={todo.id} />
            <div class="flatpickr" id={datePickerId}>
                <p>{dueDate}</p>
                <input disabled class="cal-input" type="text" data-input />
                <button class="cal-btn" type="button" data-toggle
                    ><Icon icon="carbon:calendar" /></button
                >
            </div>
        </form>

        <form method="POST" action="?/deleteTodo" use:enhance>
            <input type="hidden" name="id" value={todo.id} />
            <button class="delete-btn" type="submit">
                <Icon icon="carbon:trash-can" />
            </button>
        </form>
    </div>
</div>

<style>
    .todo-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0rem;
    }

    .complete-todo-form {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .complete-todo-btn {
        padding: 0;
        display: flex;
        align-items: center;
        background: none;
        border: none;
        margin-right: 0.5rem;
        font-size: 1.5rem;
        color: var(--lightgreyalt);
    }

    .complete-todo-btn:hover {
        cursor: pointer;
        color: var(--darkgrey);
    }

    .todo-title-btn {
        background: none;
        padding: 0;
        margin: 0;
    }

    .title-input {
        border: none;
        font-size: 1rem;
        font-family: "Manrope";
        background-color: aliceblue;
    }

    .title-input:focus {
        outline: none;
    }

    .todo-title-btn:hover {
        cursor: text;
    }

    .delete-btn {
        margin: 0;
        padding: 0;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
        background: none;
        color: var(--lightgrey);
        font-size: 1rem;
        display: flex;
        visibility: hidden;
    }

    .delete-btn:hover {
        color: tomato;
        cursor: pointer;
    }

    .todo-card:hover button {
        visibility: visible;
    }

    .action-btn-container {
        display: flex;
        align-items: center;
    }

    .flatpickr {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .cal-input {
        border: none;
        background: none;
        display: none;
    }

    .cal-btn {
        margin: 0;
        padding: 0;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
        background: none;
        color: var(--lightgrey);
        font-size: 1rem;
        display: flex;
        visibility: hidden;
    }

    .cal-btn:hover {
        color: var(--darkgrey);
    }
</style>
