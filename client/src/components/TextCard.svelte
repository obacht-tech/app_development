<script lang="ts">
    export let header: string = '';
    export let subheader: string = '';
    export let text: string = '';
</script>

<style lang="sass">
    @import "./../theme"

    .text-section

        .header
            padding-top: 80px

        .subheader

        .text
            padding-top: 80px
            padding-bottom: 80px
</style>

<section class="text-section " >
    {#if header.length>0}
        <h3 class="header margin">{header}</h3>
    {/if}
    {#if subheader.length>0}
        <h6 class="subheader margin">{subheader}</h6>
    {/if}
    {#if text.length>0}
        <h5 class="text margin">{text}</h5>
    {/if}


</section>
