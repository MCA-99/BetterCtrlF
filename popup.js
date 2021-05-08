document.getElementById('search').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
        // WAY 1
        chrome.tabs.executeScript(activeTabs[0].id, { code: 'console.log("aa");' });
    });
});
