<script>
    import { enhance } from "$app/forms";
    import Icon from "@iconify/svelte";
    import ColorPicker from "../../components/ColorPicker.svelte";

    // get the page data
    /** @type {import('./$types').PageData} */
    export let data;

    // TODO: switch to true for production
    let sideMenuToggle = false;
    let addCatToggle = false;
    let loading = false;
    let catCol;

    // function to toggle the side menu
    const handleToggle = () => {
        sideMenuToggle = !sideMenuToggle;
    };

    // function to toggle add catagorie
    const handleCatToggle = () => {
        addCatToggle = !addCatToggle;
    };

    // function for loading and to toggle add catagorie
    const beforeSubmit = () => {
        // toggle the add catagorie button
        handleCatToggle();

        // turn loading on while waiting for form to submit
        loading = true;

        // turn loading off after form submits
        return async ({ update }) => {
            loading = false;
            await update();
        };
    };
</script>

<div class="content">
    <input type="checkbox" class="check" checked={sideMenuToggle} />
    <div class="side-menu-container">
        <div class="side-menu">
            <div>
                <div class="header-container">
                    <h3 class="header">Todo App</h3>
                    <a href="/"
                        ><button class="catagorie-card">Dashboard</button></a
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
                            use:enhance={beforeSubmit}
                        >
                            <ColorPicker bind:color={catCol} />
                            <input
                                class="cat-title-input"
                                type="text"
                                name="catagorie"
                                placeholder="catagory title"
                                autofocus
                            />
                            <input
                                type="hidden"
                                name="color"
                                bind:value={catCol}
                            />
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
        <slot />
    </div>
</div>

<style>
    a {
        text-decoration: none;
    }
    .content {
        display: flex;
        flex-direction: row;
        align-items: start;
        width: 100%;
    }

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
        color: #e9d7ff;
        display: flex;
        align-items: center;
        margin-right: 0.5rem;
    }

    .logout-btn {
    }
</style>
