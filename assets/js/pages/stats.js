window.addEventListener("load", async function () {
    const start = this.performance.now();

    let statsJSON = `{"repos": ${await (await this.fetch("https://api.github.com/users/skifli/repos?type=all&per_page=100")).text()}}`; // get the stats data (API returns a list that needs to be put as a value in a map)
    this.document.getElementById("api-declaration").innerHTML = `Retreived stats from the <a href="https://docs.github.com/en/rest" class="link" target="_blank">GitHub API</a> in ${Math.round(this.performance.now() - start)} ms.`;

    statsJSON = JSON.parse(statsJSON); // parse stats into a json object
    let statsData = { "repo_owns": 0, "open_issues_count": 0, "forks_count": 0, "stars_received": 0, "forks_received": 0, "watchers_received": 0 }; // instantiate the stats data

    for (let i = 0; i < statsJSON["repos"].length; i++) {
        let repo = statsJSON["repos"][i];

        statsData["repo_owns"] += (repo["owner"]["login"] == "skifli" ? 1 : 0);
        statsData["open_issues_count"] += repo["open_issues_count"];
        statsData["forks_count"] += (repo["fork"] ? 1 : 0);
        statsData["stars_received"] += repo["stargazers_count"];
        statsData["forks_received"] += repo["forks_count"];
        statsData["watchers_received"] += repo["watchers_count"];
    }

    this.document.getElementById("repo-contribs").innerHTML = `I have contributed to ${statsJSON["repos"].length} repositor${statsJSON["repos"].length == 1 ? "y" : "ies"}.`;
    this.document.getElementById("repo-owns").innerHTML = `I own ${statsData["repo_owns"]} repositor${statsData["repo_owns"] == 1 ? "y" : "ies"}.`;
    this.document.getElementById("open-issues-count").innerHTML = `I have ${statsData["open_issues_count"]} unresolved issue${statsData["open_issues_count"] == 1 ? "" : "s"} in my repositor${statsJSON["repos"].length == 1 ? "y" : "ies"}.`;
    this.document.getElementById("forks-count").innerHTML = `I have forked ${statsData["forks_count"]} repositor${statsData["forks_count"] == 1 ? "y" : "ies"}.`;
    this.document.getElementById("stars-received").innerHTML = `I have received ${statsData["stars_received"]} star${statsData["stars_received"] == 1 ? "" : "s"}.`;
    this.document.getElementById("forks-received").innerHTML = `I have received ${statsData["forks_received"]} fork${statsData["forks_received"] == 1 ? "" : "s"}.`;
    this.document.getElementById("watchers-received").innerHTML = `I have received ${statsData["watchers_received"]} watcher${statsData["watchers_received"] == 1 ? "" : "s"}.`;
})