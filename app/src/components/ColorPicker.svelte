<script>
    // imports
    import Icon from "@iconify/svelte";

    // params
    export let color = "#778899";

    // variables
    let toggle = false;
    const colors = [
        "#3B82F6",
        "#4ADE80",
        "#FACC15",
        "#EF4444",
        "#6366F1",
        "#D946EF",
    ];

    // functions

    // handle toggling the color picker
    const handleToggle = () => {
        toggle = !toggle;
        console.log("toogle");
    };

    // change the selected color
    const selectColor = (col) => {
        color = col;
        handleToggle();
    };
</script>

{#if !toggle}
    <div class="picker-toggle">
        <button type="button" on:click={handleToggle}>
            <Icon {color} icon="material-symbols:circle" />
            <Icon
                style="transform: rotate(180deg);"
                icon="iconamoon:arrow-up-2-thin"
            />
        </button>
    </div>
{:else}
    <div class="picker-toggle">
        <button type="button" on:click={handleToggle}>
            <Icon {color} icon="material-symbols:circle" />
            <Icon
                style="transform: rotate(180deg);"
                icon="iconamoon:arrow-up-2-thin"
            />
        </button>
    </div>
    <div class="picker-container">
        {#each colors as col}
            <button on:click={() => selectColor(col)}
                ><Icon color={col} icon="material-symbols:circle" /></button
            >
        {/each}
    </div>
{/if}

<style>
    button {
        margin: 0;
        background: none;
    }

    button:hover {
        background-color: #f2efed;
    }

    .picker-container {
        background-color: #ffffff;
        position: fixed;
        transform: translateX(3rem);
        padding: 0.3rem;
        border: 1px solid black;
        border-radius: 0.2rem;
    }
</style>
