<template lang="pug">
table.rn-scoreboard
    thead
        tr
            th
                rntxt(:init_message="t('scoreboard.rank')" :init_fontSize="18")
            th
                rntxt(:init_message="t('scoreboard.team')" :init_fontSize="18")
            th
                rntxt(:init_message="t('scoreboard.score')" :init_fontSize="18")
            th(v-for="(problem, key) in problems" :key="key")
                rntxt(:init_message="problem.name" :init_fontSize="18")
                
    tbody
        tr(v-for="(team, key) in teams" :key="key")
            td
                rntxt(:init_message="team.rank" :init_fontSize="16")
            td
                rntxt(:init_message="team.name" :init_fontSize="16")
            td
                rntxt(:init_message="team.score.solved" :init_fontSize="16" :init_fontWeight="700")
                |  
                rntxt(:init_message="team.score.penalty" :init_fontSize="16")
            td(v-for="(solve, key2) in team.solves" :key="key2")
                rntxt(:init_message="solve" :init_fontSize="16")

</template>

<script>
import { toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

import rntxt from '../rntxt.vue';

export default {
    name: 'rn-scoreboard',
    components: {
        rntxt,
    },
    props: {
        teams: {
            default: [],
        },
        problems: {
            default: [],
        },
    },
    setup: function(props) {
        const { t } = useI18n();
        const { teams, problems } = toRefs(props);

        // const 

        return {
            t,
            teams,
            problems,
        }
    },
}
</script>

<style lang="scss" scoped>
.rn-scoreboard {
    width: 100%;
}
</style>