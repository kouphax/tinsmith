chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('app.html', {
    bounds: {
      width: 320,
      height: 480
    }
  });
});