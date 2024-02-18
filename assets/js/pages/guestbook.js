import { openNewPage } from "../global.js";

let signGuestbook = document.getElementById('sign-guestbook');

signGuestbook.addEventListener("click", function () {
    let guestbook = document.createElement('div');

    openNewPage(null, "../sign");
});