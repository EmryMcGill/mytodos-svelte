<script>
    // imports
    import { enhance } from "$app/forms";
    import Icon from "@iconify/svelte";
    import Flatpickr from "svelte-flatpickr";
    import "flatpickr/dist/flatpickr.css";
    import { onMount } from "svelte";

    // parameters
    export let todo;

    // variables
    let toggleTitle = false;
    let completeHover = false;
    let title = todo.title;
    let dueDate = todo.dueDate;

    // dynamic ids to identify instances of cards
    const titleFormId = "title-form" + todo.id;
    const datePickerId = "date-picker" + todo.id;
    const dateFormId = "date-form" + todo.id;

    // functions

    // toggle the title edit form
    const handleToggleTitle = () => (toggleTitle = !toggleTitle);

    // handle submit of title change
    const handleSubmit = () => {
        document.getElementById(titleFormId).requestSubmit();
        handleToggleTitle();
    };

    // called on every reload
    onMount(() => {
        // setup the date picker
        document.getElementById(datePickerId).flatpickr({
            enableTime: true,
            dateFormat: "M d, Y",
            onChange: (selectedDates, dateStr, instance) => {
                instance.close();
                dueDate = selectedDates[0];
                document.getElementById(dateFormId).requestSubmit();
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
                <p>{todo.title}</p>
            </button>
        {:else}
            <form
                id={titleFormId}
                method="POST"
                action="?/updateTodo"
                use:enhance={({ formData }) => {
                    console.log("title", title);
                    formData.append("title", title);
                    formData.append("id", todo.id);
                }}
            >
                <input
                    class="title-input"
                    type="text"
                    bind:value={title}
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
            id={dateFormId}
            use:enhance={({ formData }) => {
                console.log("date", dueDate);
                formData.append("date", dueDate);
                formData.append("id", todo.id);
            }}
        >
            <div class="flatpickr" id={datePickerId}>
                <p class="sub-text" disabled>{todo.dateString}</p>
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
