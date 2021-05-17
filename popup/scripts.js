// Wait until page is fully loaded && get usr input to pass into page active script

window.onload = () => {
    const input = document.getElementById('usrInput');
    
    input.addEventListener('input', () =>{
        chrome.tabs.query({active: true, currentWindow: true}, (tabs)  => {
            chrome.tabs.sendMessage(tabs[0].id, { input_value: input.value });
        });
    });
};