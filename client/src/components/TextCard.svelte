<script lang="ts">
    export let title: string = '';
    // export let header: string = '';
    // export let subheader: string = '';
    // export let text: string = '';
</script>

<style lang="sass">
    @import "./../theme"

    .text-section
        margin: 5rem auto 2.5rem

    //.text
    //    padding-top: 80px
    //
    //.text-title
    //    padding-top: 0
</style>

<section class="text-section container">
    <slot>
    </slot>
</section>
