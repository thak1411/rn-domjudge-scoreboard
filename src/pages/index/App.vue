<template lang="pug">
div#rn-app
    rn-root
</template>

<script>
import RnRoot from './Root.vue';
import mixins from '../mixins/mixin_default.js';

export default {
    name: 'rn-app',
    components: {
        RnRoot,
    },
    setup: function(props) {
        mixins.fetch();
    },
}
</script>

<style lang="scss">
@import "../mixins/mixin_default.scss";
</style>