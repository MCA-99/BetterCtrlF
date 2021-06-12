// Wait until page is fully loaded && get usr input to pass into page active script

window.onload = () => {
    const input = document.getElementById('usrInput');
    
    input.addEventListener('keyup', (e) =>{
        if (e.key === 'Enter'){
            chrome.tabs.query({active: true, currentWindow: true}, (tabs)  => {
                chrome.tabs.sendMessage(tabs[0].id, { input_value: input.value }, function(respuesta){
                    var count = respuesta.count;
                    var hit_count = document.querySelector(".hit_count");
                    hit_count.innerText = count;
                });
            });
        }
    });
};