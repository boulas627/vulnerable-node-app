const params = new URLSearchParams(window.location.search);
document.body.innerHTML += params.get("msg");

// should there be some sanitization above? Possible DOM based XSS here 
