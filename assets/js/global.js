const parser = new DOMParser();

let head = document.querySelector("head");
let nav = document.querySelector("nav");
let body = document.querySelector("#body");

async function changePage(event) {
    event.preventDefault();

    const page = event.target.href;
    const pageURL = page.concat("index.html");

    if (page === "") { // no change
        return
    }

    let pageRaw = await (await fetch(pageURL)).text();
    let pageParsed = parser.parseFromString(pageRaw, "text/html");

    history.pushState(null, null, page);

    head.innerHTML = pageParsed.querySelector("head").innerHTML;
    nav.innerHTML = pageParsed.querySelector("nav").innerHTML;
    body.innerHTML = pageParsed.querySelector("#body").innerHTML;

    dispatchEvent(new Event("load"));
}
