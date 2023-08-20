const parser = new DOMParser();

let head = document.querySelector("head");
let body = document.querySelector("#body");

let nav = document.querySelector("nav");

let previousMobile = true;

function getWidth() {
  return Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.documentElement.clientWidth);
}

async function navbar() {
  let mobile = false;

  if (getWidth() < 600) {
    mobile = true;
  }

  if (previousMobile !== mobile) {
    let navLinks = nav.querySelectorAll("div");

    for (let i = 0; i < navLinks.length; i++) {
      let link = navLinks[i];

      if (mobile) {
        link.classList.remove("tooltip-right");
        link.classList.add("tooltip-top");
      } else {
        link.classList.remove("tooltip-top");
        link.classList.add("tooltip-right");
      }
    }

    previousMobile = mobile;
  }
}

async function changePage(event, target) {
  event.preventDefault();

  let page = target.getAttribute("href");
  let pageURL = page.concat("index.html");

  if (page === "") { // no page change
    return;
  }

  let pageRaw = await (await fetch(pageURL)).text();
  let pageParsed = parser.parseFromString(pageRaw, "text/html");

  let pageHead = pageParsed.querySelector("head");

  for (let i = 0; i < head.children.length; i++) {
    let child = head.children[i];

    if (child.id.startsWith("fa-")) { // copy over font awesome icons cus their
                                      // script only adds them on page load
      pageHead.appendChild(child.cloneNode(true));
    }
  }

  history.pushState(null, null, page);

  head.innerHTML = pageHead.innerHTML;
  nav.innerHTML = pageParsed.querySelector("nav").innerHTML;

  body.remove();
  body = document.body.appendChild(pageParsed.querySelector("#body"));

  navbar();
}

window.addEventListener('resize', navbar);

window.addEventListener('load', function() { navbar(); });