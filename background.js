function extractDomain(url) {
let domain;

if(url.indexOf("://")> -1){
    domain = url.split('/')[2];
} else {
    domain = url.split('/')[0];
}

return domain;

}
function handleTabChange(){
    let example_url="youtube.com"

    chrome.tabs.query({}, function(tabs) {
        let tabData = {};
        tabs.forEach(function(tab) {
            let domain = extractDomain(tab.url);

            if(tabData[domain]){
                tabData[domain].push(tab);

            }else{
                tabData[domain] = [tab];
            }

        });

        chrome.storage.local.set({"tabData":tabData});


    })
}

chrome.tabs.onUpdated.addListener(handleTabChange);
chrome.tabs.onRemoved.addListener(handleTabChange);
chrome.tabs.onCreated.addListener(handleTabChange);

let example_array = [1, 2, 3, 4, 5];
let string_array = ["hello", "world", "super", "cool"];

console.log(string_array[2]);

let json_array = {"key1": "value", "key2": "value2", "key3": "value3"};

console.log(json_array["key1"]);