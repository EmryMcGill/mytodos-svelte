<script>
    // imports
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

    // variables
    let loading = false;
    let dueDateStr = "";
    let dueDate;
    let catCol;
    let sideMenuToggle = false;
    let addCatToggle = false;

    // functions

    // before form submits
    const beforeSubmit = ({ formData }) => {
        // turn loading on while waiting for form to submit
        loading = true;

        // give the date to the form data
        formData.append("date", dueDate);
        formData.append("dateStr", dueDateStr);

        // reset the date variables
        dueDate = null;
        dueDateStr = "";

        // turn loading off after form submits
        return async ({ update }) => {
            loading = false;
            await update();
        };
    };

    // function to toggle the side menu
    const handleToggle = () => {
        sideMenuToggle = !sideMenuToggle;
    };

    // function to toggle add catagorie
    const handleCatToggle = () => {
        addCatToggle = !addCatToggle;
    };

    onMount(() => {
        // setup the date picker
        document.getElementById("date-picker").flatpickr({
            enableTime: true,
            dateFormat: "M d, Y",
            onChange: (selectedDates, dateStr, instance) => {
                dueDate = selectedDates[0];
                instance.close();
                document.getElementById("cal-btn-main").focus();
                dueDateStr = new Date(dateStr).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });
            },
        });
    });
</script>

<input type="checkbox" class="check" checked={sideMenuToggle} />
<div class="side-menu-container">
    <div class="side-menu">
        <div>
            <div class="header-container">
                <h3 class="header">Todo App</h3>
                <a href="/"><button class="catagorie-card">Dashboard</button></a
                >
                <a href="/apps/notes"
                    ><button class="catagorie-card">Notes</button></a
                >
            </div>

            <div class="catagories-container">
                <div class="catagorie-label">
                    <h3 class="catagorie-label-text">Catagories</h3>
                    <button class="add-cat-btn" on:click={handleCatToggle}>
                        <Icon icon="ph:plus" />
                    </button>
                </div>
                {#if addCatToggle}
                    <form
                        class="cat-input-form"
                        action="/apps?/createCatagorie"
                        method="POST"
                        use:enhance={() => {
                            // close the color picker
                            handleCatToggle();
                        }}
                    >
                        <ColorPicker bind:color={catCol} />
                        <input
                            class="cat-title-input"
                            type="text"
                            name="catagorie"
                            placeholder="catagory title"
                            autofocus
                        />
                        <input type="hidden" name="color" bind:value={catCol} />
                    </form>
                {/if}

                {#each data.catagories as cat}
                    {#if cat.id == data.current_catagorie}
                        <button class="cur-catagorie-card">
                            <div class="catagorie-icon">
                                <Icon
                                    color={cat.color}
                                    icon="material-symbols:circle"
                                />
                            </div>

                            {cat.title}
                        </button>
                    {:else}
                        <form
                            action="/apps?/changeCurrentCatagorie"
                            method="POST"
                            use:enhance
                        >
                            <button class="catagorie-card">
                                <div class="catagorie-icon">
                                    <Icon
                                        color={cat.color}
                                        icon="material-symbols:circle"
                                    />
                                </div>
                                {cat.title}
                            </button>
                            <input type="hidden" name="id" value={cat.id} />
                        </form>
                    {/if}
                {/each}
            </div>
        </div>

        <form action="/?/logout" method="POST">
            <button class="logout-btn">Logout</button>
        </form>
    </div>
    <button class="check-label" on:click={handleToggle}>
        <Icon icon="ep:arrow-up-bold" />
    </button>
</div>
<div class="main-container">
    <h1>My Todos</h1>

    <form
        class="form-container"
        method="POST"
        action="?/createTodo"
        id="todo-form"
        use:enhance={beforeSubmit}
    >
        <input autofocus type="text" name="todo" placeholder="Todo Name" />

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
            <button
                id="cal-btn-main"
                class="cal-btn action-btn"
                type="button"
                data-toggle><Icon icon="carbon:calendar" /></button
            >
        </div>
        <button class="action-btn" type="submit">+ Add Task</button>
    </form>

    {#each data.todos as todo}
        <TodoCard {todo} />
        <div class="line-break"></div>
    {/each}
</div>

<style>
    .main-container {
        padding: 1rem;
        width: 100%;
    }

    .check {
        display: none;
    }

    .side-menu-container {
        display: flex;
        flex-direction: row;
        align-items: start;
        position: sticky;
        top: 0;
    }

    .side-menu {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fcfaf8;
        height: 100vh;
        width: 12rem;
        overflow: hidden;
        transition: 0.5s;
    }

    .check:checked + .side-menu-container .side-menu {
        width: 0rem;
        transition: 0.5s;
    }

    .check-label {
        background: none;
        border: none;
        padding: 0;
        font-size: 1rem;
        color: var(--lightgreyalt);
        transform: rotate(-90deg);
        transition: 0.5s;
        margin: 1rem;
    }

    .check:checked + .side-menu-container .check-label {
        transform: rotate(90deg);
        transition: 0.5s;
    }

    .check-label:hover {
        cursor: pointer;
        color: var(--darkgrey);
    }

    .cat-input-form {
        display: flex;
        align-items: center;
        margin: 0;
        margin: 0.5rem;
        border-radius: 0.2rem;
        padding: 0.3rem;
        text-wrap: nowrap;
        font-family: "Manrope";
        font-size: 1rem;
        border: none;
        background-color: #f2efed;
    }

    .catagories-container {
        margin-top: 1rem;
    }

    .catagorie-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-left: 0rem;
        margin-bottom: 0.5rem;
    }

    .add-cat-btn {
        background: none;
        border: none;
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
        margin-right: 0.5rem;
        font-size: 1rem;
        color: var(--lightgrey);
    }

    .add-cat-btn:hover {
        color: var(--darkgrey);
    }

    .add-cat-btn:hover {
        cursor: pointer;
    }

    .cat-title-input {
        border: none;
        font-family: "Manrope";
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        width: calc(100% - 1rem);
        background-color: #f2efed;
    }

    .cat-title-input:focus {
        outline: none;
    }

    .cur-catagorie-card {
        background-color: #f2efed;
        width: calc(100% - 1rem);
    }

    .catagorie-card {
        background: none;
        width: calc(100% - 1rem);
    }

    .catagorie-card:hover {
        background-color: #f2efed;
        cursor: pointer;
    }

    .catagorie-icon {
        display: flex;
        align-items: center;
        margin-right: 0.5rem;
    }

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

    input[type="text"] {
        width: 100%;
        font-family: "Poppins";
        font-size: 1em;
        padding: 0.3rem;
        margin: 0.25rem;
    }

    .flatpickr {
        display: flex;
    }

    .cal-input {
        display: none;
    }

    .cal-btn {
        padding: 0.5rem;
    }

    .date-text {
        text-wrap: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.5rem;
    }
</style>
