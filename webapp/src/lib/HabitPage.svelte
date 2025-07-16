<script lang="ts">
    let habits:string[] = [];

    function addHabit(text: string) {
        if (text.trim()) {
            habits = [...habits, { text, completed: false }];
        }
    }

    function toggleHabit(habit:string) {
        habits = habits.map(h =>
            h === habit ? {...h, completed: !h.completed} : h
        );
    }

    function deleteHabit(habitToDelete) {
        habits = habits.filter(h => h !== habitToDelete);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const text = formData.get('habit').toString().trim();
        if (text) {
            addHabit(text);
            event.target.reset();
        }
    }
</script>

<style>
    .habit-form {

    }

    .habit-form input[type="text"] {
        width: calc(100% - 100px);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }

    .habit-form button {
        padding: 10px 15px;
        background-color: #007AFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .habit-list {
        margin-top: 10px;
    }
</style>

<div class="habit-page">
    <form class="habit-form" on:submit={handleFormSubmit}>
        <input type="text" name="habit" placeholder="输入新习惯..." required />
        <button type="submit">添加</button>
    </form>

    <div class="habit-list">
        {#if habits.length > 0}
            {#each habits as habit}
                <div class="habit-item {habit.completed ? 'completed' : ''}">
                    <label>
                        <input type="checkbox" checked={habit.completed} on:change={() => toggleHabit(habit)} />
                        {habit.text}
                    </label>
                    <button on:click={() => deleteHabit(habit)}>Delete</button>
                </div>
            {/each}
        {:else}
            <p>没有习惯，请添加一些。</p>
        {/if}
    </div>
</div>