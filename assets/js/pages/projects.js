function randomRGB() {
    return `rgb(${Math.floor(Math.random() * 600)}, ${Math.floor(Math.random() * 400)}, ${Math.floor(Math.random() * 600)})`
}

function randomGradient() {
    return `linear-gradient(90deg, ${randomRGB()}, ${randomRGB()})`;
}

window.addEventListener("load", async function () {
    const start = this.performance.now();

    let projectsJSON = `{ "repos": ${await (await this.fetch("https://api.github.com/users/skifli/repos?type=all&per_page=100")).text()} } `; // get the stats data (API returns a list that needs to be put as a value in a map)
    this.document.getElementById("api-declaration").innerHTML = `Retreived stats from the <a href="https://docs.github.com/en/rest" class="link" target="_blank"> GitHub API</a> in ${Math.round(this.performance.now() - start)} ms.`;

    projectsJSON = JSON.parse(projectsJSON); // parse stats into a json object

    let contents = this.document.getElementById("contents");

    for (let i = 0; i < projectsJSON["repos"].length; i++) {
        let repo = projectsJSON["repos"][i];

        let card = this.document.createElement("div");
        card.className = "card";
        card.style["background"] = randomGradient();
        card.innerHTML = `<h5>${repo["full_name"]}</h5> <p>${repo["description"]}</p>`;
        card.onclick = function () {
            window.open(repo["html_url"], "_blank").focus();
        };

        contents.appendChild(card);
    }
})