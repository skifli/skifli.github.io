import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm'

const pages = {
    "home": "",
    "about": "about",
    "projects": "projects",
    "blog": "blog",
    "photography": "photography",
    "contact": "contact",
};

let body = document.getElementsByTagName("body")[0];
let nav = null;
let islands = {};

function moveIsland(event) {
    event.preventDefault();

    let pos1 = event.clientX, pos2 = event.clientY, pos3 = 0, pos4 = 0;
    let element = event.target.parentElement;

    function onIslandMove(event) {
        event.preventDefault();

        pos3 = pos1 - event.clientX;
        pos4 = pos2 - event.clientY;
        pos1 = event.clientX;
        pos2 = event.clientY;

        let newX = element.offsetLeft - pos3;
        let newY = element.offsetTop - pos4;

        if (newX < 0) {
            newX = 0;
        }

        if (newY < 0) {
            newY = 0;
        }

        if (newX > window.innerWidth - element.offsetWidth) {
            newX = window.innerWidth - element.offsetWidth;
        }

        if (newY > window.innerHeight - element.offsetHeight) {
            newY = window.innerHeight - element.offsetHeight;
        }

        element.style.top = newY + "px";
        element.style.left = newX + "px";
    }

    function stopIslandMove() {
        document.onmousemove = null;
        document.onmouseup = null;
    }

    document.onmousemove = onIslandMove;
    document.onmouseup = stopIslandMove;
}

function resizeIsland(event) {
    event.preventDefault();

    const currentResizer = event.target;
    const minimum_size = 150;

    let element = event.target.parentElement.parentElement;
    let original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
    let original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
    let original_x = element.getBoundingClientRect().left;
    let original_y = element.getBoundingClientRect().top;
    let original_mouse_x = event.pageX;
    let original_mouse_y = event.pageY;

    function resize(event) {
        if (currentResizer.classList.contains('bottom-right')) {
            const width = original_width + (event.pageX - original_mouse_x);
            const height = original_height + (event.pageY - original_mouse_y)

            if (width > minimum_size) {
                element.style.width = width + 'px'
            }

            if (height > minimum_size) {
                element.style.height = height + 'px'
            }
        }
        else if (currentResizer.classList.contains('bottom-left')) {
            const height = original_height + (event.pageY - original_mouse_y)
            const width = original_width - (event.pageX - original_mouse_x)

            if (height > minimum_size) {
                element.style.height = height + 'px'
            }

            if (width > minimum_size) {
                element.style.width = width + 'px'
                element.style.left = original_x + (event.pageX - original_mouse_x) + 'px'
            }
        }
        else if (currentResizer.classList.contains('top-right')) {
            const width = original_width + (event.pageX - original_mouse_x)
            const height = original_height - (event.pageY - original_mouse_y)

            if (width > minimum_size) {
                element.style.width = width + 'px'
            }

            if (height > minimum_size) {
                element.style.height = height + 'px'
                element.style.top = original_y + (event.pageY - original_mouse_y) + 'px'
            }
        }
        else {
            const width = original_width - (event.pageX - original_mouse_x)
            const height = original_height - (event.pageY - original_mouse_y)

            if (width > minimum_size) {
                element.style.width = width + 'px'
                element.style.left = original_x + (event.pageX - original_mouse_x) + 'px'
            }

            if (height > minimum_size) {
                element.style.height = height + 'px'
                element.style.top = original_y + (event.pageY - original_mouse_y) + 'px'
            }
        }
    }

    function stopResize() {
        window.removeEventListener('mousemove', resize);
    }

    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResize)
}

function middleize(element) {
    element.style.top = (window.innerHeight / 2) - (element.offsetHeight / 2) + "px";
    element.style.left = (window.innerWidth / 2) - (element.offsetWidth / 2) + "px";
}

function moveMiddleDivsToCenter() {
    let style = document.createElement("style");
    style.innerHTML = `.middle {
        top: initial;
        left: initial;
        transform: initial;
    }`;

    document.head.appendChild(style);

    let element = null;

    for (element of document.getElementsByClassName("middle")) {
        middleize(element);
    }
}

function giveLifeToIslands() {
    let islands = document.getElementsByClassName("island");

    for (let i = 0; i < islands.length; i++) {
        let island = islands[i];

        let resizers = island.getElementsByClassName("resizers")[0];
        let resizer = null;
        let islandToolbar = island.getElementsByClassName("toolbar")[0];
        let actionButtons = islandToolbar.getElementsByClassName("action-buttons")[0];
        let closeButton = actionButtons.getElementsByClassName("close")[0];

        island.onclick = function (event) {
            let islands = document.getElementsByClassName("island");

            for (let i = 0; i < islands.length; i++) {
                islands[i].style.zIndex = 0;
            }

            island.style.zIndex = 1;
        };

        islandToolbar.onmousedown = function (event) { island.onclick(event); moveIsland(event); };
        closeButton.onclick = function (event) {
            event.target.parentElement.parentElement.parentElement.remove();
        };

        for (resizer of resizers.getElementsByClassName("resizer")) {
            resizer.addEventListener("mousedown", resizeIsland);
        }
    }
}

function createWindow(element, width, resizeable, icon, title, closeButton) {
    element.classList.add("island");
    element.style.width = `${width}px`;
    element.innerHTML = `<div class='resizers ${resizeable ? "" : "unresizable"}'>
    <div class='resizer top-left'></div>
    <div class='resizer top-right'></div>
    <div class='resizer bottom-left'></div>
    <div class='resizer bottom-right'></div>
</div>
<div class="toolbar">
    <div class="title">
        <span class="material-symbols-outlined">
            ${icon}
        </span>
        <p>${title}</p>
    </div>
    <div class="action-buttons">
        <div class="icon close" style="display: ${closeButton ? "initial" : "none"};">
            <img src="assets/img/close.png" alt="Close" />
        </div>
    </div>
</div>
<div class="body">
    <div class="contents">
    </div>
</div>`;
}

function placeIsland(element) {
    if (Object.keys(islands).length == 0) {
        element.style.left = "10px";
        element.style.top = "10px";

        islands[10] = element;
    } else {
        let furthestX = parseInt(Object.keys(islands).reduce((a, b) => obj[a] > obj[b] ? a : b));
        let newX = furthestX + islands[furthestX].offsetWidth + 10;

        element.style.left = `${newX}px`;
        element.style.top = "10px";
    }
}

function buildNav() {
    nav = document.createElement("nav");
    nav.style.display = "none";
    createWindow(nav, 150, false, "menu", "Menu", false);

    let contents = nav.getElementsByClassName("body")[0].getElementsByClassName("contents")[0];

    for (let page in pages) {
        let navItem = document.createElement("div");
        navItem.classList = "nav-item";
        navItem.innerHTML = `<a href="${body.dataset.homeurl}${pages[page]}" id="${page == body.dataset.page ? "current" : ""}">${page}</a>`;

        contents.appendChild(navItem);
    }

    body.appendChild(nav);
}

function checkIslandHeights() {
    // for each island, check if height is greater than window height and if so make it smaller

    for (let island of document.getElementsByClassName("island")) {
        if (island.offsetHeight > window.innerHeight) {
            island.style.height = `${window.innerHeight - 20}px`;
        }
    }
}

function setupPage() {
    let pageContents = document.getElementById("page-contents");
    pageContents.style.display = "initial";
    nav.style.display = "initial";

    placeIsland(nav);
    placeIsland(pageContents);

    checkIslandHeights();
}

function hideInfo() {
    let infoIsland = document.getElementById("info-island");

    infoIsland.remove();
    jsCookie.set("tutorialSeen", "true", { expires: 7 });

    setupPage();
}

function checkForInfo() {
    const tutorialSeen = jsCookie.get("tutorialSeen");

    if (tutorialSeen != "true") {
        let tutorialIsland = document.createElement("div");
        tutorialIsland.classList = "island middle";
        tutorialIsland.id = "info-island";
        tutorialIsland.style.width = "300px";

        tutorialIsland.innerHTML = `<div class='resizers'>
        <div class='resizer top-left'></div>
        <div class='resizer top-right'></div>
        <div class='resizer bottom-left'></div>
        <div class='resizer bottom-right'></div>
    </div>
    <div class="toolbar">
        <div class="title">
            <span class="material-symbols-outlined">
                info
            </span>
            <p>Info</p>
        </div>
        <div class="action-buttons">
            <div class="icon close">
                <img src="assets/img/close.png" alt="Close" />
            </div>
        </div>
    </div>
    <div class="body">
        <div class="contents">
            <p>Welcome to my home on the web, where you can create, drag, and resize windows to your heart's
                content.
                Now that I've told you the premise of this site, just click below to begin your journey.</p>

            <p>Oh and before you ask, I did make this myself. No fancy frameworks, just plain ol' HTML, CSS, and JS.
                Enjoy your stay.</p>

            <p>Yours truly - © skifli 2023.</p>
        </div>
        <div class="footer">
            <button>
                <p>Ok, don't show again</p>
            </button>
        </div>
    </div>`;

        tutorialIsland.getElementsByClassName("footer")[0].getElementsByTagName("button")[0].onclick = hideInfo;

        body.appendChild(tutorialIsland);
    } else {
        setupPage();
    }
}

window.addEventListener("load", function () {
    this.document.getElementById("js-required").remove();

    buildNav(); // has to be done before checkForInfo()
    checkForInfo();

    giveLifeToIslands();
    moveMiddleDivsToCenter();
});