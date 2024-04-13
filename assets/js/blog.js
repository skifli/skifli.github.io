const parser = new DOMParser();

async function parseBlogs(show_tags) {
    let rss = await (await fetch("../../blog/rss.xml")).text();
    let rssParsed = parser.parseFromString(rss, "text/xml");
    let rssItems = rssParsed.querySelectorAll("item");

    let items = [];
    let all_categories = [];

    rssItems.forEach((item) => {
        let title = item.querySelector("title").innerHTML;
        let link = item.querySelector("link").innerHTML;
        let description = item.querySelector("description").innerHTML;
        let pubDate = item.querySelector("pubDate").innerHTML;
        let categories = [];

        item.querySelectorAll("category").forEach((category) => {
            categories.push(category.innerHTML);

            if (!all_categories.includes(category.innerHTML)) {
                all_categories.push(category.innerHTML);
            }
        });

        items.push({
            title: title,
            link: link,
            description: description,
            pubDate: pubDate,
            categories: categories
        });
    });

    if (show_tags) {
        let buttons = document.getElementById("blog-categories");

        all_categories.forEach((category, index) => {
            buttons.innerHTML += `<a href="?category=${category}" class="custom button ${index % 2 == 0 ? "" : "inverse"}"><div><p>#${category}</p></div></a>`;
        });
    }

    return items;
}

export async function displayBlogs(n) {
    const URL_PARAMS = new URLSearchParams(window.location.search);

    let category = "";

    if (URL_PARAMS.has("category")) {
        category = URL_PARAMS.get("category");
    }

    let rssBlogs = await parseBlogs(n == undefined ? true : false);

    rssBlogs = rssBlogs.slice(0, n == undefined ? rssBlogs.length : n);

    let blogs = document.querySelectorAll("#blogs");

    for (let i = 0; i < rssBlogs.length; i++) {
        let blog = rssBlogs[i];

        if (category != "") {
            if (!blog.categories.includes(category)) {
                continue;
            }
        }

        let blogElement = document.createElement("div");
        let blogTitleDiv = document.createElement("div");
        let blogTitle = document.createElement("h3");
        let blogPubDate = document.createElement("p");
        let blogDescription = document.createElement("p");

        blogElement.className = "box blog";
        blogTitleDiv.className = "box-header";
        blogTitle.className = "custom";

        blogTitle.innerHTML = `<a href="${blog.link}">${blog.title}</a>`
        blogPubDate.innerHTML = blog.pubDate;
        blogDescription.innerHTML = blog.description;

        blogTitleDiv.appendChild(blogTitle);
        blogTitleDiv.appendChild(blogPubDate);

        blogElement.appendChild(blogTitleDiv);
        blogElement.appendChild(blogDescription);

        blogs[0].appendChild(blogElement);
    }
}