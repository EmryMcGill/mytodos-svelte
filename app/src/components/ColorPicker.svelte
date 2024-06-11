<script>
    import Icon from "@iconify/svelte";

    let toggle = false;
    export let color = "#778899";

    const handleToggle = () => {
        toggle = !toggle;
        console.log("toogle");
    };

    const selectColor = (col) => {
        color = col;
        console.log("change col");
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
        <button on:click={() => selectColor("#5FF19B")}
            ><Icon
                color="var(--green)"
                icon="material-symbols:circle"
            /></button
        >
        <button on:click={() => selectColor("#FDE389")}
            ><Icon
                color="var(--yellow)"
                icon="material-symbols:circle"
            /></button
        >
        <button on:click={() => selectColor("#BFD6FE")}
            ><Icon color="var(--blue)" icon="material-symbols:circle" /></button
        >
        <button on:click={() => selectColor("#FED9D3")}
            ><Icon color="var(--red)" icon="material-symbols:circle" /></button
        >
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
