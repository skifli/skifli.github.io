import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm'

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

        element.style.top = (element.offsetTop - pos4) + "px";
        element.style.left = (element.offsetLeft - pos3) + "px";
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
        element.style.top = (window.innerHeight / 2) - (element.offsetHeight / 2) + "px";
        element.style.left = (window.innerWidth / 2) - (element.offsetWidth / 2) + "px";
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

window.addEventListener("load", function () {
    this.document.getElementById("js-required").remove();

    giveLifeToIslands();
    moveMiddleDivsToCenter();
});