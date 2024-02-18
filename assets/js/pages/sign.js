let gform = document.getElementById('gform');
let captcha = document.getElementById('g-recaptcha-response');

gform.addEventListener('submit', function (event) {
    event.preventDefault();

    var response = grecaptcha.getResponse();

    if (response.length === 0) {
        alert("Please complete the captcha!");

        return;
    }

    event.target.submit();

    alert("Success! Redirecting to guestbook page...");
    window.location.href = "../guestbook/";
});