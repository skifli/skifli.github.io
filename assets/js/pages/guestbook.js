import "https://cdn.jsdelivr.net/npm/dompurify@3.0.8/dist/purify.min.js";
import { ContentFilterBadWord } from "./profanity.js";

let guestbook = document.getElementById('guestbook');

let blocker = new ContentFilterBadWord();

export function addEntries() {
    fetch(
        `https://opensheet.elk.sh/11QtCaoHT8sO6mpBkvhIAVC5uqwfQgNsljBxarirWYl8/Form+responses+1`
    )
        .then((res) => res.json())
        .then((data) => {
            guestbook.innerHTML = "";

            for (let index = data.length - 1; index >= 0; index--) {
                if (Object.keys(data[index]).length === 0) {
                    continue;
                }

                let li = document.createElement('li');

                let pre = document.createElement('pre');
                pre.className = "entry-name-and-timestamp";
                pre.innerText = DOMPurify.sanitize(`${blocker.cleanText(data[index].Name)} - (${data[index].Timestamp})`);

                let pre2 = document.createElement('pre');
                pre2.className = "entry-message";
                pre2.innerText = DOMPurify.sanitize(blocker.cleanText(data[index].Guestbook_Entry));

                li.appendChild(pre);
                li.appendChild(pre2);
                guestbook.appendChild(li);
            }
        });
}