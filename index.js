/*
** This script wait a response from popup.js and actuate over actual page
** @mca [15/06/2021]
*/

var count = 0;
var old_value = "";
var hit_position = [];
var hit_indx = 0;

/*
** Listen for answers from popup.js and call functions
** @mca [15/06/2021]
*/
chrome.runtime.onMessage.addListener((data, sender, count_response) => {
    if (data.name == "usr_input") {
        unhighlight();
        highlight(data.input_value, "yellow");
        count_response({"count":count});
    } else if (data.name == "next_hit") {
        scrollHit_next();
    } else if (data.name == "prev_hit") {
        scrollHit_prev();
    }
});

/*
** Find and highlight the input from the popup
** @mca [15/06/2021]
**
** ### Enable design mode on page (required to use 'execCommand') ###
** Loop over every hit using window.find and change the background color
** Prevent windw.find to change user position in page
** Count all the hit for unhighlight function
** Save all the Y positions to use in popup search
*/
function highlight(text, backgroundColor) {
    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);
        var y_scroll = window.scrollY;
        // ***** TODO: detectar si el usuario va un hit hacia delante o detras y mover la posicion de la pagina a donde corresponda *****
        while (window.find(text)) {
            document.execCommand("HiliteColor", false, backgroundColor);
            sel.collapseToEnd();
            count++;
            hit_position.push(window.scrollY);
        }
        // ***** DELETE ME LATER *****
        console.log("position: ", hit_position);

        old_value = text;
        document.designMode = "off";
        window.scrollTo(0, y_scroll);        
    }
}

/*
** Find and unhighlight the input from the popup
** @mca [15/06/2021]
**
** ### Enable design mode on page (required to use 'execCommand') ###
** Go through every window.find using the count variable and undone the execCommand
** Reset the count variable
*/
function unhighlight(){
    document.designMode = "on";
    for (i=0; i<=count; i++) {
        document.execCommand("undo");
    }
    hit_position = [];
    count = 0;
    document.designMode = "off";
}


/*
** Scroll to hit position if user presses next or back btn in popup
** @mca [16/06/2021]
**
*/
function scrollHit_next() {
    if (hit_indx < count && hit_indx != count) {
        hit_indx++;
        window.scrollTo(0, hit_position[hit_indx]);
    }
    // ***** DELETE ME LATER *****
    console.log(hit_indx);
}

function scrollHit_prev() {
    if (hit_indx <= count && hit_indx != 0) {
        hit_indx--;
        window.scrollTo(0, hit_position[hit_indx]);
    }
    // ***** DELETE ME LATER *****
    console.log(hit_indx);
}