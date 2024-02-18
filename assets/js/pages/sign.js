let gform = document.getElementById('gform');
let captcha = document.getElementById('g-recaptcha-response');

gform.addEventListener('submit', function (event) {
    var response = grecaptcha.getResponse();

    if (response.length === 0) {
        event.preventDefault();
        alert("Please complete the captcha!");

        return;
    }

    alert("Success! Redirecting to guestbook page...");
    window.location.href = "../guestbook/";
});