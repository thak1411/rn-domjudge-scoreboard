<template lang="pug">
span.rn-txt(:style="style") {{ message }}
</template>

<script>
import Util from './js/util.js';
import { computed, toRefs } from 'vue';
export default {
    name: 'rn-txt',
    props: {
        init_message: { // 텍스트 메시지
            default: '',
        },
        init_color: { // 텍스트 색상
            default: '#000000',
        },
        init_fontSize: { // 텍스트 크기
            default: 12,
        },
        init_fontFamily: { // 텍스트 폰트
            default: 'AppleSdGothicNeo',
        },
        init_fontWeight: { // 텍스트 굵기
            default: 400,
        },
    },
    setup: function(props) {
        const { init_message, init_color, init_fontSize, init_fontFamily, init_fontWeight } = toRefs(props);
        
        // 텍스트 스타일
        const style = computed(() => {
            return {
                color: init_color.value,
                fontSize: Util.mU(init_fontSize.value),
                fontFamily: init_fontFamily.value,
                fontWeight: init_fontWeight.value
            }
        });
        return {
            style,
            message: init_message
        }
    },
}
</script>

<style lang="scss" scoped>
</style>