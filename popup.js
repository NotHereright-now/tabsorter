console.log("hello world");

function grabDataFromStorage() {
    chrome.storage.local.get("tabData", function(data){
        const tabData = data.tabData || {};
        updatePopup(tabData)
        //const title = tabData[0][0]["title"]

        //const tabList= document.getElementById("tab-list");
        //tabList.textContent= title;
    });
}

function updatePopup(tabData) {//update the popup
    const tabList = document.querySelector('.tab-list')
    tabList.innerHTML = '';

    for (let domain in tabData){
        const tabItem = tabData[domain].map(tab =>{
            let title = tab.title;
            let url = tab.url;
            return `
            <div class="tab-item" data.url="${tab.url}" data-tab-id="${tab.id}">
            <span>${title}<span/>
            <button class="close-btn">X</button>

            </div>
            `;
        }).join('');

        tabList.innerHTML += `
        <div class="tab-item">
        <strong>${domain}</domain>
        <ul>${tabItem}</ul>
        </div>
        `
    }

    tabList.querySelectorAll('.tab-item').forEach(tabItem => {
        tabItem.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('close-btn')) {
                event.stopPropagation();
                const tabId = parseInt(tabItem.getAttribute("data-tab-id"));
                chrome.tabs.remove(tabId);
                tabItem.remove();
            } else {
                const tabId = parseInt(tabItem.getAttribute("data-tab-id"));
                chrome.tabs.update(tabId, {active: true});
                window.close();

            }
        });
    })

}

document.addEventListener('DOMContentLoaded', function() {
    grabDataFromStorage();

});
//create a variable in popup.js that stores the title of each tab in the tabData Json object.