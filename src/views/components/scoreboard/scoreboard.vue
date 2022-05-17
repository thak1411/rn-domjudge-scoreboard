<template lang="pug">
table.rn-scoreboard
    thead
        tr
            th
                rntxt(:init_message="t('scoreboard.rank')" :init_fontSize="16" :init_fontWeight="700")
            th
                rntxt(:init_message="t('scoreboard.team')" :init_fontSize="16" :init_fontWeight="700")
            th(colspan="2")
                rntxt(:init_message="t('scoreboard.score')" :init_fontSize="16" :init_fontWeight="700")
            th(v-for="(problem, key) in problems" :key="key")
                rntxt(:init_message="problem.name" :init_fontSize="16" :init_fontWeight="700")
    tbody
        tr(v-for="(team, key) in teams" :key="key" :class="team.selected ? 'rn-scoreboard-selected' : ''")
            td.w40
                rntxt(:init_message="team.rank" :init_fontSize="14")
            td.rn-name
                rntxt(:init_message="team.name" :init_fontSize="14" :init_fontWeight="900")
            td.w40
                rntxt(:init_message="team.score.solved" :init_fontSize="14" :init_fontWeight="900")
            td.w40
                rntxt(:init_message="team.score.penalty" :init_fontSize="14")
            td.rn-scoreboard-solve-wrapper(v-for="(solve, key2) in team.solves" :key="key2")
                div(:class="getSolveClass(solve, team.fsolves[key2], team.pending[key2])")
                    div
                        rntxt(:init_message="team.times[key2]" :init_fontSize="16" :init_color="solve > 0 ? '#000000' : '#00000000'")
                    div(v-if="team.pending[key2]")
                        rntxt(:init_message="Math.abs(solve) + ' + ' + team.pending[key2] + ' tries'" :init_fontSize="12")
                    div(v-else-if="solve")
                        rntxt(:init_message="Math.abs(solve) + (Math.abs(solve) > 1 ? ' tries' : ' try')" :init_fontSize="12")
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

        const getSolveClass = (solve, fsolve, pending) => {
            if (fsolve) return 'rn-scoreboard-fac';
            else if (pending > 0) return 'rn-scoreboard-pen';
            else if (solve > 0) return 'rn-scoreboard-ac';
            else if (solve < 0) return 'rn-scoreboard-wa';
            else return '';
        }

        return {
            t,
            teams,
            problems,
            getSolveClass,
        }
    },
}
</script>

<style lang="scss" scoped>
.rn-scoreboard {
    margin: 0 auto;
    text-align: center;
    vertical-align: middle;
    border-collapse: collapse;

    thead {
        tr {
            height: 42px;
            border-bottom: 1px solid black;
        }
        th {
            padding: 0px;
            border-right: 1px solid silver;
        }
    }
    tbody {
        tr:first-child {
            border-top: 2px solid black;
        }
        tr {
            height: 42px;
            border-bottom: 1px solid black;
        }
        td:not(.rn-scoreboard-solve-wrapper) {
            border-right: 1px solid silver;
        }
    }
}
.rn-name {
    overflow: hidden;
    text-align: right;
    font-weight: bold;
    white-space: nowrap;
    padding: 0px 5px;
    text-overflow: ellipsis;
    background-color: #c4c4c4;
}
.w40 {
    width: 40px;
}
.rn-scoreboard-solve-wrapper {
    width: 62px;
    padding: 2px;
}
.rn-scoreboard-ac {
    width: 100%;
    height: 38px;
    padding: 2px;
    box-sizing: border-box;
    background-color: #60e760;
}
.rn-scoreboard-fac {
    width: 100%;
    height: 38px;
    padding: 2px;
    box-sizing: border-box;
    background-color: #1daa1d;
}
.rn-scoreboard-pen {
    width: 100%;
    height: 38px;
    padding: 2px;
    box-sizing: border-box;
    background-color: #6158ff;
}
.rn-scoreboard-wa {
    width: 100%;
    height: 38px;
    padding: 2px;
    box-sizing: border-box;
    background-color: #e87272;
}
.rn-scoreboard-selected {
    background-color: #fff9a0;
}
</style>