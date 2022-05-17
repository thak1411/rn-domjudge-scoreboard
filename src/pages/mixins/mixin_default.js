import { useStore } from 'vuex';
import { useCookies } from 'vue3-cookies';

import axios from 'axios';

// import config from '../../../config';

/**
 * 기본 설정을 합니다.
 */
function fetch() {
    const store = useStore();
    const { cookies } = useCookies();
    axios.defaults.withCredentials = true;

    // 쿠키에 저장된 토큰을 파싱해서 유저 정보를 설정합니다.
    // const session = cookies.get(config.cookie.public_session);
    // if (session) {
    //     store.commit('setUserFromJWT', session);
    // } else {
    //     store.commit('setUser', {
    //         id: null,
    //         username: 'GUEST',
    //         create_time: null,
    //     });
    // }
}

export default {
    fetch,
}