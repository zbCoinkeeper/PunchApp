<script>
    export let colorMap = {};
    export let displayFlags = {};
    export let baseSize = 200;
    export let step = 30;
    export let borderWidth = 20;

    $: displayedCategories = Object.entries(displayFlags)
        .filter(([_, show]) => show)
        .map(([category]) => category);

    function size(category) {
        const index = displayedCategories.indexOf(category);
        return `${baseSize - index * step}px`;
    }

    function margin(category) {
        const index = displayedCategories.indexOf(category);
        const stepMargin = step / 2;
        return `${stepMargin * index}px auto auto ${stepMargin * index}px`;
    }
</script>

<style>
    .ring-container {
        position: relative;
    }

    .ring {
        position: absolute;
        border-radius: 50%;
        box-sizing: border-box;
    }
</style>

<!-- 动态尺寸用 style 属性设置 -->
<div class="ring-container" style="width: {baseSize}px; height: {baseSize}px;">
    {#each displayedCategories as categoryName (categoryName)}
        <div
                class="ring"
                style="
        border: {borderWidth}px solid;
        border-color: {colorMap[categoryName]};
        width: {size(categoryName)};
        height: {size(categoryName)};
        margin: {margin(categoryName)};
      "
        ></div>
    {/each}
</div>