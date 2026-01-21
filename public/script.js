const params = new URLSearchParams(window.location.search);
document.body.innerHTML += params.get("msg");
