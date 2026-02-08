const params = new URLSearchParams(window.location.search);
// document.body.innerHTML += params.get("msg");
let msg = params.get("msg"); 
let newElement = document.createElement("div"); 

newElement.textContent = msg; 
document.body.appendChild(newElement); 

// should there be some sanitization above? Possible DOM based XSS here 

//textContent will treat all data as plain text and therefore is the safest way of preventing DOM based XSS here. 