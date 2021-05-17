// Wait response from popup and actuate over page

chrome.runtime.onMessage.addListener(({ input_value }) => {
    console.log(': ' + input_value);
});