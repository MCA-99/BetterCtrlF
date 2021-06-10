// Wait response from popup and actuate over page

chrome.runtime.onMessage.addListener(({ input_value }) => {
    function doSearch(text, backgroundColor) {
        if (window.find && window.getSelection) {
            document.designMode = "on";
            var sel = window.getSelection();
            sel.collapse(document.body, 0);
    
            while (window.find(text)) {
                document.execCommand("HiliteColor", false, backgroundColor);
                sel.collapseToEnd();
            }
            document.designMode = "off";
        }
    }

    doSearch(input_value, "yellow");
});