class RnScoreboard {
    updateRun(runs, changedRuns) {
        for (let i = 0; i < runs.length; ++i) {
            if (runs[i].result == '') {
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
                solves: Array(problems.length).fill(0),
                fsolves: Array(problems.length).fill(0),
            });
            hteam[val.id] = i;
        }
        for (let i = 0; i < problems.length; ++i) {
            let val = problems[i];
            hproblem[val.id] = i;
        }
        for (let i = 0; i < runs.length; ++i) {
            let val = runs[i];
            if (val.result.length < 1) break;

            let tidx = hteam[val.team];
            let pidx = hproblem[val.problem];
            if (team[tidx].solves[pidx] > 0) continue;
            if (val.result == 'Yes') {
                team[tidx].solves[pidx] = -team[tidx].solves[pidx] + 1;
                team[tidx].score.solved += 1;
                team[tidx].score.penalty += val.submissionTime + (team[tidx].solves[pidx] - 1) * tpenalty;
                if (!hsolve[pidx]) {
                    hsolve[pidx] = 1;
                    team[tidx].fsolves[pidx] = 1;
                }
            } else {
                team[tidx].solves[pidx] -= 1;
            }
        }
        team.sort((i, j) => {
            return i.score.solved == j.score.solved ? i.score.penalty - j.score.penalty : j.score.solved - i.score.solved;
        });
        let rnk = 1
        for (let i = 0; i < team.length; ++i) {
            team[i].rank = rnk;
            if (i + 1 < team.length
                && (team[i].score.penalty != team[i + 1].score.penalty
                    || team[i].score.solved != team[i + 1].score.solved)) {
                rnk += 1;
            }
        }
        return team;
    }
}

export default new RnScoreboard();