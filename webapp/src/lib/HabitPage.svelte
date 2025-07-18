<script lang="ts">
    import { onMount } from 'svelte';

    type Habit = {
        id: string;
        text: string;
        completedDates: Set<string>;
    };

    let habits: Habit[] = [];

    // 加载 localStorage 数据（可选）
    onMount(() => {
        const saved = localStorage.getItem('habits');
        if (saved) {
            const parsed = JSON.parse(saved);
            habits = parsed.map((h: any) => ({
                ...h,
                completedDates: new Set(h.completedDates)
            }));
        }
    });

    // 保存数据到 localStorage
    function saveHabits() {
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function addHabit(text: string) {
        if (text.trim()) {
            habits = [
                ...habits,
                {
                    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9),
                    text: text.trim(),
                    completedDates: new Set<string>()
                }
            ];
            saveHabits();
        }
    }

    function toggleHabitCompletion(habitId: string) {
        const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
        const habit = habits.find(h => h.id === habitId);
        if (habit) {
            if (habit.completedDates.has(today)) {
                habit.completedDates.delete(today);
            } else {
                habit.completedDates.add(today);
            }
            habits = [...habits];
            saveHabits();
        }
    }

    function deleteHabit(habitId: string) {
        habits = habits.filter(h => h.id !== habitId);
        saveHabits();
    }

    function handleFormSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const input = form.habit as HTMLInputElement;
        const text = input.value.trim();
        if (text) {
            addHabit(text);
            input.value = '';
        }
    }

    // 获取当前一周的日期（用于打卡展示）
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - today.getDay() + i);
        return {
            date: d.toISOString().split('T')[0],
            day: days[d.getDay()]
        };
    });
</script>

<style>
    .habit-form {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }

    .habit-form input[type="text"] {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }

    .habit-form button {
        padding: 10px 15px;
        background-color: #007aff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .habit-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .habit-item {
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 10px;
        background-color: #f9f9f9;
    }

    .habit-title {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .habit-calendar {
        display: flex;
        gap: 5px;
    }

    .habit-day {
        flex: 1;
        text-align: center;
        padding: 8px;
        border-radius: 4px;
        background-color: #e0e0e0;
        font-size: 14px;
        position: relative;
        cursor: pointer;
    }

    .habit-day.completed {
        background-color: #d4edda;
        color: #155724;
    }

    .habit-day::after {
        content: attr(data-day);
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 10px;
        color: #666;
    }

    .habit-item button {
        margin-top: 10px;
        padding: 4px 8px;
        font-size: 12px;
        background-color: #ff4d4d;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>

<div class="habit-page">
    <form class="habit-form" on:submit={handleFormSubmit}>
        <input type="text" name="habit" placeholder="输入新习惯..." required />
        <button type="submit">添加</button>
    </form>

    <div class="habit-list">
        {#if habits.length > 0}
            {#each habits as habit (habit.id)}
                <div class="habit-item">
                    <div class="habit-title">{habit.text}</div>
                    <div class="habit-calendar">
                        {#each weekDates as dateInfo}
                            <div
                                    class="habit-day {habit.completedDates.has(dateInfo.date) ? 'completed' : ''}"
                                    data-day={dateInfo.day}
                                    on:click={() => toggleHabitCompletion(habit.id)}
                            >
                                {dateInfo.date.split('-').slice(2).join('')}
                            </div>
                        {/each}
                    </div>
                    <button on:click={() => deleteHabit(habit.id)}>Delete</button>
                </div>
            {/each}
        {:else}
            <p>没有习惯，请添加一些。</p>
        {/if}
    </div>
</div>