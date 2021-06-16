// Wait until page is fully loaded && get usr input to pass into page active script

window.onload = () => {
    var input = document.getElementById('usrInput');
    input.addEventListener('keyup', (e) =>{
        if (e.key === 'Enter'){
            chrome.tabs.query({active: true, currentWindow: true}, (tabs)  => {
                chrome.tabs.sendMessage(tabs[0].id, { name: "usr_input", input_value: input.value }, function(count_response){
                    var count = count_response.count;
                    var hit_count = document.querySelector(".hit_count");
                    hit_count.innerText = "/" + count;
                });
            });
        }
    });

    var next_hit = document.getElementById('next_hit');
    next_hit.addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs)  => {
            chrome.tabs.sendMessage(tabs[0].id, { name: "next_hit", next_hit }, function(){

            });
        });
    });

    var prev_hit = document.getElementById('prev_hit');
    prev_hit.addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs)  => {
            chrome.tabs.sendMessage(tabs[0].id, { name: "prev_hit", prev_hit }, function(){

            });
        });
    });
};