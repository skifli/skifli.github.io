window.addEventListener("load", async function () {
    var ul = document.getElementById("projects");

    try {
        var start = performance.now();
        var req = await fetch("https://api.github.com/users/skifli/repos?type=all&per_page=100");
        var text = await req.text();
        document.getElementById("api-declaration").innerHTML = `<p id="api-declaration"><i>This data was retrieved from the <a href="https://docs.github.com/en/rest"class="link" target="_blank">GitHub API</a> in ${performance.now() - start} ms.</i></p>`;

        var json = JSON.parse("{\"repos\":" + text + "}");

        for (let i = 0; i < json.repos.length; i++) {
            var repo = json.repos[i];

            let li = this.document.createElement("li");
            li.innerHTML = `<i class='bx bx-info-circle icon' onclick='showInfo(\`${repo['full_name']}\`)'></i> <a href="${repo['html_url']}" class="link" target="_blank">${repo['full_name']}</a> - ${repo['description']}`;

            ul.appendChild(li);
        }
    } catch (e) {
        let err = `Failed to get my respositories from the GitHub api - ${e}.`;
        console.error(err);

        let li = this.document.createElement("li");
        li.innerHTML = err;

        ul.appendChild(li);
    }
})

async function showInfo(repo) {
    try {
        var start = performance.now();
        var req = await fetch("https://api.github.com/repos/" + repo + "");
        var repo = JSON.parse(await req.text());
        document.getElementById("info-api-declaration").innerHTML = `<p id="info-api-declaration"><i>Retrieved repository data in ${performance.now() - start}ms.</i></p>`;

        if (repo["homepage"] == "") {
            document.getElementById("homepage").style.display = "none";
        } else {
           let homepage = document.getElementById("homepage");
           homepage.style.display = "";
           homepage.innerHTML = `Homepage: <a href="${repo["homepage"]}" class="link" target="_blank">${repo["homepage"]}</a>`;
        }

        document.getElementById("title").innerHTML = `<a href="${repo['html_url']}" class="link" target="_blank">${repo['full_name']}</a> (${repo['stargazers_count']} Star${repo['stargazers_count'] == 1 ? '' : 's'}, ${repo['forks_count']} Fork${repo['forks_count'] == 1 ? '' : 's'}, ${repo['watchers_count']} Watcher${repo['watchers_count'] == 1 ? '' : 's'})`;
        document.getElementById("description").innerHTML = `${repo['description']}`;
        document.getElementById("language").innerHTML = `Written mainly in ${repo['language']}.`;
        document.getElementById("license").innerHTML = `${repo['license']['name'] == "Other" ? 'Unknown license' : repo['license']['name']}.`;
        document.getElementById("issues").innerHTML = `${repo['open_issues_count']} open issue${repo['open_issues_count'] ? '' : 's'}.`;
    } catch (e) {
        let err = `Failed to get repository data for ${repo} from the GitHub api - ${e}.`;
        console.error(err);

        document.getElementById("info-api-declaration").innerHTML = `<p id="info-api-declaration"><i>Failed to retrieve repository data - '${err}'.</i></p>`;
    }

    document.getElementById("info").style["display"] = "inline-block";
}