// Wait response from popup and actuate over page

chrome.runtime.onMessage.addListener(({ input_value }) => {
    if (document.getElementsByClassName("selectedText highlighted").length > 0){
        unhighlight();
    }
    
    doSearch(input_value, "yellow");
});

function doSearch(text, backgroundColor) {
    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);
        var y_scroll = window.scrollY;

        while (window.find(text)) {
            document.execCommand("HiliteColor", false, backgroundColor);
            sel.collapseToEnd();
        }
        document.designMode = "off";
        window.scrollTo(0, y_scroll);
    }
}

function unhighlight(){
    document.execCommand("undo"); 
}