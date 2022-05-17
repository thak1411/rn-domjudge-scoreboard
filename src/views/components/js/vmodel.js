import { computed } from 'vue';
class Vmodel {
    /**
     * v-model props를 받아주는 함수입니다.
     * 
     * component(v-model="{model_data}") 로 넘겨주고
     * 컴포넌트 내부에서 props: {model_data}를 한 뒤
     * const data = Util.modelIO(props, emit, '{model_data}')로 사용하면 됩니다.
     */
    modelIO(props, emit, name = 'modelValue') {
        return computed({
            get: () => props[name],
            set: (value) => emit(`update:${name}`, value)
        });
    }
}

export default new Vmodel();