let savedLeads = []

const inText = document.getElementById("in-text")
const inBtn = document.getElementById("in-btn")
let outLeads = document.getElementById("out-leads")
let deleteBtn = document.getElementById("remove-btn")
let saveBtn = document.getElementById("save-btn")

let finalLinks = JSON.parse(localStorage.getItem("links"))

saveBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        savedLeads.push(tabs[0].url)
        localStorage.setItem("savedLeads", JSON.stringify(savedLeads))
        renderOps(savedLeads)
    })
    
})


if(finalLinks) {
    savedLeads = finalLinks
    renderOps(savedLeads)
}

inBtn.addEventListener("click", function() {
    savedLeads.push(inText.value)
    inText.value = ""
    let strMold = JSON.stringify(savedLeads)
    localStorage.setItem("links", strMold)
    renderOps(savedLeads)
})

deleteBtn.addEventListener("dblclick", function() {
    finalLinks.length = 0
    outLeads.innerHTML = ""
})



function renderOps(leads) {
    let listItems = ""
    for(i=0; i<leads.length; i++) {
            listItems += "<li>" + "<a href='" + leads[i] + "' target='_blank'>" + leads[i] + "</a>" +"</li>"
    }

    outLeads.innerHTML = listItems
}
