const parser = new DOMParser();

var n;

let head = document.querySelector("head");
let nav = document.querySelector("nav");
let body = document.querySelector("#body");

function updateN() {
  n = null;

  head.querySelectorAll("script").forEach((script) => {
    if (script.id === "n") {
      n = parseInt(script.innerHTML);
    }
  });
}

async function changePage(event) {
  event.preventDefault();

  const page = event.target.href;
  const pageURL = page.concat("index.html");

  if (page === "") {
    // no change
    return;
  }

  let pageRaw = await (await fetch(pageURL)).text();
  let pageParsed = parser.parseFromString(pageRaw, "text/html");

  history.pushState(null, null, page);

  head.innerHTML = pageParsed.querySelector("head").innerHTML;
  nav.innerHTML = pageParsed.querySelector("nav").innerHTML;
  body.innerHTML = pageParsed.querySelector("#body").innerHTML;

  updateN();

  displayBlogs();
}

async function parseBlogs() {
  let rss = await (await fetch("../../blog/rss.xml")).text();
  let rssParsed = parser.parseFromString(rss, "text/xml");
  let rssItems = rssParsed.querySelectorAll("item");

  let items = [];

  rssItems.forEach((item) => {
    let title = item.querySelector("title").innerHTML;
    let link = item.querySelector("link").innerHTML;
    let description = item.querySelector("description").innerHTML;
    let pubDate = item.querySelector("pubDate").innerHTML;

    items.push({
      title: title,
      link: link,
      description: description,
      pubDate: pubDate,
    });
  });

  return items;
}

async function displayBlogs() {
  if (n == null) {
    return;
  }

  let rssBlogs = await parseBlogs();

  rssBlogs = rssBlogs.slice(0, n == 0 ? rssBlogs.length : n);

  let blogs = document.querySelectorAll("#blogs");

  for (let i = 0; i < rssBlogs.length; i++) {
    let blog = rssBlogs[i];

    let blogElement = document.createElement("li");
    let blogTitle = document.createElement("a");
    let blogPubDate = document.createElement("p");

    blogTitle.innerHTML = blog.title;
    blogTitle.href = blog.link;
    blogTitle.onclick = "changePage(event);";

    blogPubDate.innerHTML = blog.pubDate;

    blogElement.appendChild(blogTitle);
    blogElement.appendChild(blogPubDate);

    blogs[0].appendChild(blogElement);
  }
}

window.addEventListener("load", async function () {
  updateN();
  await displayBlogs();
});