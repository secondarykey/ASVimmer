var stateMap = {};

function setState(win) {
  stateMap[win.id] = {
    state:win.state, 
    x:win.left, 
    y:win.top,
    w:win.width, 
    h:win.height
  };
}

function getState(win) {
  return stateMap[win.id];
}

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    chrome.windows.getCurrent(function(win) {
      if (win.state != "fullscreen") {
        setState(win);
        chrome.windows.update(win.id, {state: "fullscreen"});
	  } else {
        let state = getState(win);
	    if ( state ) {
	      chrome.windows.update(
            win.id, {
              state:state.state, 
              left:state.x, 
              top:state.y,
              width:state.w, 
              height:state.h
            }
          );
        } else {
	      chrome.windows.update(win.id, {state:"maximized"});
        }
      }
    });
  });
});
