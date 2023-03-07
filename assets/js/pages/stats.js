window.addEventListener("load", async function () {
    const start = this.performance.now();

    let statsJSON = `{"repos": ${await (await this.fetch("https://api.github.com/users/skifli/repos?type=all&per_page=100")).text()}}`; // get the stats data (API returns a list that needs to be put as a value in a map)
    this.document.getElementById("api-declaration").innerHTML = `Retreived stats from the <a href="https://docs.github.com/en/rest" class="link" target="_blank">GitHub API</a> in ${this.performance.now() - start} ms.`;

    statsJSON = JSON.parse(statsJSON); // parse stats into a json object
    let statsData = { "stars": 0, "forks": 0, "watchers": 0 }; // instantiate the stats data

    for (let i = 0; i < statsJSON.repos.length; i++) {
        let repo = statsJSON.repos[i];

        statsData["stars"] += repo["stargazers_count"];
        statsData["forks"] += repo["forks_count"];
        statsData["watchers"] += repo["watchers_count"];
    }

    this.document.getElementById("repo-contribs").innerHTML = `Contributed to ${statsJSON.repos.length} repositor${statsJSON.repos.length == 1 ? "y" : 'ies'}.`;
    this.document.getElementById("stars-count").innerHTML = `Received ${statsData["stars"]} star${statsData["stars"] == 1 ? "" : "s"}.`;
    this.document.getElementById("forks-count").innerHTML = `Received ${statsData["forks"]} fork${statsData["forks"] == 1 ? "" : "s"}.`;
    this.document.getElementById("watchers-count").innerHTML = `Received ${statsData["watchers"]} watcher${statsData["watchers"] == 1 ? "" : "s"}.`;
})