const parser = new DOMParser();

export async function parseBlogs() {
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
