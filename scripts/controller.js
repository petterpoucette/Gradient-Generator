/**
 * The controller.js is resposible for the connection to the interface. 
 * It handles the functions that is triggerd by button presses, keypressen
 */


function toggleSettings(e){
    icon = e.children[0];
    
    item = e.parentNode
    state = e.children[0].getAttribute("state")
    animateListItem(item, state)
    animateEditIcons(item.nextElementSibling, state)
    settingsIconAnimation(icon)
}

function lockColor(e, ID){
    let edit = e.parentNode.previousElementSibling.lastElementChild
    console.log(edit);
    let smallLock = e.parentNode.nextElementSibling

    gradient.colors[ID].lock = !gradient.colors[ID].lock
    animateLock(e)
    
    setTimeout(() => {
        toggleSettings(edit)
        smallLock.style.setProperty("display", gradient.colors[ID].lock ? "block" : "none")
    }, 350);
    
}


/**
 * Toggle the edit menu
 * @param {HTMLElement} el - Menu to toggle
 */
function toggleMenu(el){
    document.getElementById(el).classList.toggle('edit-open')
}

/**
 * Eventlistener that detects i enter has been pressed and trigger nex colors if
 * it is
 */
document.addEventListener("keypress", function onEvent(event) {
    if (event.keyCode == 32) {
        gradient.randomizeColors()
        setBodyGradient()
        setListItemColor()
        newColor()
    } 
});

/**
 * Fills the list of colors with li objects
 */
function setList(){
    let ul = document.getElementById("color-list")
    for (const [key, color] of Object.entries(gradient.colors)) {
        setListItem(key,ul)  
    }
    setListItemColor()
}

/**
 * Removes the color from both the list and the color gradient
 * @param {HTMLElement} e - The button element that is a child of the li element to remove
 * @param {string} ID - ID of the color to remove
 */
function removeColor(e, ID){
    removeAnimation(e.parentNode.parentNode)
    gradient.removeColorFromGradient(ID)
    setBodyGradient()
    setTimeout(() => {
        e.parentNode.parentNode.remove();
    }, 1000);
    
    
}


/**
 * Adds a color to the gradient and the list
 */
function addColor(){
    gradient.addColorToGradient()
    let ul = document.getElementById("color-list")
    let ID = gradient.colorID - 1
    setListItem(ID,ul)
    newColor()
    setBodyGradient()
    setListItemColor()
}

/**
 * Updates the DOM style gradient on the body element
 */
function setBodyGradient(){
    document.getElementsByTagName("body")[0].style.backgroundImage = gradient.gradient
}

function setListItemColor(){
    let ul = document.getElementById("color-list")
    
    for (const [key, element] of Object.entries(ul.children)) {
        let ID = element.getAttribute("color-ID");
        let rgb = gradient.colors[ID].rgb;
        element.style.setProperty("--color", rgb)
    }
}


/**
 * Creates the li its containing elements 
 * @param {string} ID 
 * @param {HTMLElement} ul 
 */
function setListItem(ID ,ul){
    const li = document.createElement('li');
 
    li.setAttribute("color-ID", ID)

    let content  = `
    <div class="input-group">rgb(
        <input color-id="` + ID + `" color="r" class="color-input" type="text">,
        <input color-id="` + ID + `" color="g" class="color-input" type="text">, 
        <input color-id="` + ID + `" color="b" class="color-input" type="text">)
        <div class="color-settings-icon-background" onclick="toggleSettings(this)">
            <div state="closed" class="color-settings-icon"></div>
        </div>
    </div>
    <div class="edit-icons">
        <img class="edit-icon" src="assets/delete.png" onclick="removeColor(this,` + ID + `)">
        <div class="lock-icon" state="unlocked" onclick="lockColor(this, ` + ID+ `)"></div>
    </div>
    <div class="lock-icon small" ></div>`


    /*
    let content = '<div class="input-group">rgb(' +
        '<input color-id="' + ID +'" color="r" class="color-input" type="text">,' +
        '<input color-id="' + ID +'" color="g" class="color-input" type="text">,' + 
        '<input color-id="' + ID +'" color="b" class="color-input" type="text">)' + 
        '<div class="color-settings-icon-background" onclick="toggleSettings(this)">' + 
            '<div state="closed" class="color-settings-icon"></div>' + 
        '</div></div>' +
        '<div class="edit-icons">' +
            '<img class="edit-icon" src="assets/delete.png" onclick="removeColor(this,' + ID + ')">' + 
            '<div class="lock-icon" state="unlocked" onclick="lockColor(this, ' + ID+ ')"></div>' + 
        '</div>' + 
        '<div class="lock-icon small" ></div>'
    */

    li.innerHTML  = content

    ul.appendChild(li)
}