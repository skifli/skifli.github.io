import {parseBlogs} from "../helpers.js";

window.addEventListener("load", async () => {
  let rssBlogs = await parseBlogs();

  let blogs = document.querySelectorAll("#blogs");
  blogs[0].innerHTML = "";

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
});