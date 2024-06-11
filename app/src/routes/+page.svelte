<script>
    // get the page data
    /** @type {import('./$types').PageData} */
    export let data;
</script>

{#if data.user}
    <div class="dash-container">
        <h1>Dashboard</h1>
        <p>
            Hello, {data.user.email} what would you like to do?
        </p>
        <a href="/apps/todos"><button class="todos-btn"> My Todos </button></a>
    </div>
{:else}
    <div>
        <h1>Task Tracker</h1>
        <p>
            Welcome to this cool app where you can take quick notes and keep
            track of tasks
        </p>
    </div>
{/if}

<style>
    .dash-container {
        padding: 1rem;
    }
    .todos-btn {
        background-color: #e9d7ff;
        padding: 1rem;
        border: none;
        border-radius: 0.5rem;
    }

    .todos-btn:hover {
        cursor: pointer;
    }
</style>
