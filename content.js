var timer = undefined;

var elm = document.createElement('a');

elm.innerHTML = `
TEST BUTTON
`;

elm.addEventListener("click",function() {
  var port = chrome.extension.connect({name: "Background Message"});
  port.postMessage("Clicked");
});

function searchElement() {
  let target = document.querySelector("div.f1upyuoq");
  if ( target === null ) {
      return undefined;
  }
  return target;
}

function appendButton() {

  var elm = searchElement();
  if ( elm === undefined ) {
    return;
  }

  if ( timer !== undefined ) {
    window.clearInterval(timer);
  }
  buttons.appendChild(elm);
}

timer = window.setInterval(appendButton, 1000);
