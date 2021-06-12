// Wait response from popup and actuate over page
var count = 0;
var old_value = "";

chrome.runtime.onMessage.addListener(({ input_value }, sender, respuesta) => {
    unhighlight();
    doSearch(input_value, "yellow");
    respuesta({"count":count});
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
            count++;
        }

        old_value = text;
        document.designMode = "off";
        window.scrollTo(0, y_scroll);        
    }
}

function unhighlight(){
    document.designMode = "on";
    console.log(old_value);
    // while (window.find(old_value)) {
    //     document.execCommand("undo");
    //     console.log("yea");
    // }
    console.log(count);
    for (i=0; i<=count; i++) {
        document.execCommand("undo");
    }
    count = 0;
    document.designMode = "off";
}