window.addEventListener("load", async function () {
    var req = await fetch("https://raw.githubusercontent.com/skifli/skifli/master/generated/overview.svg#gh-dark-mode-only");
    var text = await req.text();

    const parser = new DOMParser();
    var html = parser.parseFromString(text, "text/html");

    var rows = html.getElementsByTagName("tr");

    this.document.getElementById("stars").innerHTML = `Received ${rows[1].getElementsByTagName("td")[1].innerText} star${rows[1].getElementsByTagName("td")[1].innerText == 1 ? '' : 's'}.`;
    this.document.getElementById("forks").innerHTML = `Received ${rows[2].getElementsByTagName("td")[1].innerText} fork${rows[2].getElementsByTagName("td")[1].innerText == 1 ? '' : 's'}.`;
    this.document.getElementById("contributions").innerHTML = `${rows[3].getElementsByTagName("td")[1].innerText} all-time contribution${rows[3].getElementsByTagName("td")[1].innerText == 1 ? '' : 's'}.`;
    this.document.getElementById("loc").innerHTML = `${rows[4].getElementsByTagName("td")[1].innerText} line${rows[4].getElementsByTagName("td")[1].innerText == 1 ? '' : 's'} of code changed.`;
    this.document.getElementById("views").innerHTML = `${rows[5].getElementsByTagName("td")[1].innerText} repository view${rows[5].getElementsByTagName("td")[1].innerText == 1 ? '' : 's'} in the past two weeks.`;
    this.document.getElementById("repos-contrib").innerHTML = `${rows[6].getElementsByTagName("td")[1].innerText} repositor${rows[6].getElementsByTagName("td")[1].innerText == 1 ? 'y' : 'ies'} with contributions.`;

    var ul = this.document.getElementById("langs-used");
    var req = await fetch("https://raw.githubusercontent.com/skifli/skifli/master/generated/languages.svg#gh-dark-mode-only");
    var text = await req.text();

    var html = parser.parseFromString(text, "text/html");
    var langs = html.getElementsByTagName("li");

    for (let i = 0; i < langs.length; i++) {
        let lang = langs[i];

        let li = document.createElement("li");
        li.innerHTML = `<div class='wrapper'><p>${lang.getElementsByClassName("lang")[0].innerHTML}</p> <p class='right'>${lang.getElementsByClassName("percent")[0].innerHTML}</p></div>`;

        ul.appendChild(li);
    }
})