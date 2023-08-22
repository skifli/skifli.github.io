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

async function displayBlogs(n = -1) {
  let rssBlogs = (await parseBlogs()).slice(0, n);

  let blogs = document.querySelectorAll("#blogs");

  for (let i = 0; i < rssBlogs.length; i++) {
    let blog = rssBlogs[i];

    let blogElement = document.createElement("li");
    let blogTitle = document.createElement("a");
    let blogPubDate = document.createElement("p");

    blogTitle.innerHTML = blog.title;
    blogTitle.href = blog.link;

    blogPubDate.innerHTML = blog.pubDate;

    blogElement.appendChild(blogTitle);
    blogElement.appendChild(blogPubDate);

    blogs[0].appendChild(blogElement);
  }
}
