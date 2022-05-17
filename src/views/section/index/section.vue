<template lang="pug">
section.index-section
    button(@click="onClick") update
    rn-scoreboard(
        :teams="rankedTeam"
        :problems="contest.problems"
    )
</template>

<script>
import { ref } from 'vue';

import runs from '../../../../dummy/runs.json';
import contest from '../../../../dummy/contest.json';
import changed_runs from '../../../../dummy/changed_runs.json';
import RnScoreboard from '../../components/scoreboard/scoreboard.vue';
import rnscoreboard from '../../components/scoreboard/scoreboard.js';

export default {
    name: 'index-section',
    components: {
        RnScoreboard,
    },
    setup: function() {
        const sb = rnscoreboard;
        let run = runs.runs;
        let crun = changed_runs.runs;

        const rankedTeam = ref(sb.makeRankedTeam(run, contest.teams, contest.problems, 20));

        const onClick = () => {
            sb.updateRun(run, crun, rankedTeam.value, contest.problems);
            rankedTeam.value = sb.makeRankedTeam(run, contest.teams, contest.problems, 20);
        }

        return {
            onClick,
            contest,
            rankedTeam,
        }
    },
}
</script>

<style lang="scss" scoped>
.index-section {
    width: 100%;
}
</style>