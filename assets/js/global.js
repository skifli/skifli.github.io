let nav = document.querySelector("nav");
let navLinks = nav.querySelector("#links");

let previousMobile = true;

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

async function navbar() {
    let mobile = false;

    if (getWidth() < 600) {
        mobile = true;
    }

    if (previousMobile !== mobile) {
        let links = navLinks.getElementsByClassName("link");

        for (let i = 0; i < links.length; i++) {
            let link = links[i];

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

window.addEventListener('resize', navbar);

window.addEventListener('load', function () {
    navbar();
});