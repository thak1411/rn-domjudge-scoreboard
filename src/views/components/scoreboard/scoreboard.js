class RnScoreboard {
    updateRun(runs, changedRuns, team, problems) {
        // get selected team
        let sel = -1;
        for (let i = team.length; i--; ) {
            if (team[i].selected) {
                sel = i;
                break;
            }
        }
        if (sel == -1) return 0; // if no selected team, return
        let pidx = -1;
        // get pending problem index
        for (let i = 0; i < team[sel].pending.length; ++i) {
            let val = team[sel].pending[i];
            if (val > 0) {
                pidx = i;
                break;
            }
        }
        if (pidx == -1 && sel == 0) return 0; // if no pending problem & no more team, return
        if (pidx == -1) { // if no pending problem, select next team
            team[sel].selected = 0;
            team[sel - 1].selected = 1;
            return -1;
        }
        // get first problem in pending queue
        for (let i = 0; i < runs.length; ++i) {
            if (runs[i].result == '' && runs[i].team == team[sel].id && problems[pidx].id == runs[i].problem) {
                runs[i].result = changedRuns[i].result;
                return 1
            }
        }
        return 0
    }

    makeRankedTeam(runs, teams, problems, tpenalty) {
        let team = [];
        let hteam = {};
        let hproblem = {};
        let hsolve = {};

        // make dummy team data
        for (let i = 0; i < teams.length; ++i) {
            let val = teams[i];
            team.push({
                id: val.id,
                name: val.name,
                rank: 0,
                score: {
                    solved: 0,
                    penalty: 0,
                },
                times: Array(problems.length).fill(0),
                solves: Array(problems.length).fill(0),
                fsolves: Array(problems.length).fill(0),
                pending: Array(problems.length).fill(0),
                selected: 0,
            });
            hteam[val.id] = i;
        }
        // make problems_id to id_index table
        for (let i = 0; i < problems.length; ++i) {
            let val = problems[i];
            hproblem[val.id] = i;
        }
        // make first solve data
        for (let i = 0; i < runs.length; ++i) {
            let val = runs[i];
            let tidx = hteam[val.team];
            let pidx = hproblem[val.problem];
            if (team[tidx].solves[pidx] > 0) continue; // if already solved, skip
            // if result is empty, insert to pending queue
            if (val.result.length < 1) {
                team[tidx].pending[pidx] += 1;
                continue;
            }
            if (val.result == 'Yes') { // AC
                console.log(val)
                team[tidx].times[pidx] = val.submissionTime;
                team[tidx].solves[pidx] = -team[tidx].solves[pidx] + 1;
                team[tidx].score.solved += 1;
                team[tidx].score.penalty += val.submissionTime + (team[tidx].solves[pidx] - 1) * tpenalty;
                if (!hsolve[pidx]) {
                    hsolve[pidx] = 1;
                    team[tidx].fsolves[pidx] = 1;
                }
            } else { // WA
                team[tidx].solves[pidx] -= 1;
            }
        }
        // sort by rank
        team.sort((i, j) => {
            return i.score.solved == j.score.solved ? i.score.penalty - j.score.penalty : j.score.solved - i.score.solved;
        });
        // make team rank
        let rnk = 1
        for (let i = 0; i < team.length; ++i) {
            team[i].rank = rnk;
            if (i + 1 < team.length
                && (team[i].score.penalty != team[i + 1].score.penalty
                    || team[i].score.solved != team[i + 1].score.solved)) {
                rnk += 1;
            }
        }
        // set selected
        for (let i = team.length; i--; ) {
            let val = team[i], sum = 0;
            for (let j = 0; j < val.pending.length; ++j) {
                sum += val.pending[j];
            }
            if (sum < 1) continue;
            team[i].selected = 1;
            break;
        }
        return team;
    }
}

export default new RnScoreboard();