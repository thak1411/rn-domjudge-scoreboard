<template lang="pug">
div.rn-root
    rn-header
    rn-section
    rn-footer
    //- rn-modal
</template>

<script>
// import RnModal from '../../views/modal/modal.vue';
import RnHeader from '../../views/header/header.vue';
import RnFooter from '../../views/footer/footer.vue';
import RnSection from '../../views/section/index/section.vue';

export default {
    name: 'rn-root',
    components: {
        // RnModal,
        RnHeader,
        RnFooter,
        RnSection,
    },
}
</script>

<style lang="scss" scoped>
.rn-root {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>