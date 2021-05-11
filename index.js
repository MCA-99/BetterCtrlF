// Wait response from popup and actuate over page

chrome.runtime.onMessage.addListener(({ input_value }) => {
    console.log('Value currently is ' + input_value);
});