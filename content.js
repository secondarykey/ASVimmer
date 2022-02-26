var timer = undefined;

var child = document.createElement('a');

child.innerHTML = `
<svg class="photon-icon ng-scope" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="
    width: 44px;
    height: 22.5px;
">
<text x="0" y="0" font-size="11px" font-family="Arrial" text-anchor="middle">
<tspan dx="8" dy="11">VIM</tspan>
</text>
</svg>
`;

child.addEventListener("click",function() {
  var port = chrome.extension.connect({name: "Background Message"});
  port.postMessage("Clicked");
});

function searchElement() {
  let target = document.querySelector("span.toolbar-left > div.toolbar-group");
  if ( target === null ) {
      return undefined;
  }
  return target;
}

function appendButton() {

  var parent = searchElement();
  if ( parent === undefined ) {
    return;
  }

  if ( timer !== undefined ) {
    window.clearInterval(timer);
  }
  parent.appendChild(child);
}

timer = window.setInterval(appendButton, 1000);
