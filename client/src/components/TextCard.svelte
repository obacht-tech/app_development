<script lang="ts">
    export let header: string = '';
    export let subheader: string = '';
    export let title: string = '';
    export let text: string = '';
</script>

<style lang="sass">
    @import "./../theme"

    .text-section
        padding-top: 80px
        .text
            padding-top: 80px
        .text-title
            padding-top: 0

</style>

<section class="text-section " >
    {#if header.length>0}
        <h3 class="margin">{header}</h3>
    {/if}
    {#if subheader.length>0}
        <h6 class="margin">{subheader}</h6>
    {/if}
    {#if title.length>0}
        <h4 class="title margin">{title}</h4>
    {/if}
    {#if text.length>0}
        <h5 class="text margin" class:text-title={title}>{text}</h5>
    {/if}


</section>
