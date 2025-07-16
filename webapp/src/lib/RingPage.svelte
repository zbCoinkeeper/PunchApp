<script>
    import RingContainer from './components/RingContainer.svelte';

    let colorMap = {
        'Category A': 'red',
        'Category B': 'yellow',
        'Category C': '#45b7d1'
    };

    let displayFlags = {
        'Category A': true,
        'Category B': true,
        'Category C': true
    };
</script>

<RingContainer {colorMap} {displayFlags} />