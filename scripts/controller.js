/**
 * The controller.js is resposible for the connection to the interface. 
 * It handles the functions that is triggerd by button presses, keypressen
 */


function toggleSettings(e){
    icon = e.children[0];
    item = e.parentNode
    state = e.children[0].getAttribute("state")
    animateListItem(item, state)
    settingsIconAnimation(icon)
    
}

function settingsIconAnimation(e){
    if(e.getAttribute("state") == "closed"){
        e.style.setProperty('--left-after', '0')
        e.style.setProperty('--left-before', '0')
        e.style.setProperty('--width', '14px')
        e.style.setProperty('margin-left', '12px')
    
        setTimeout(() => {
            e.style.setProperty('width', '0')
            e.style.setProperty('--height', '4px')
            e.style.setProperty('--rotate-after', '-45deg')
            e.style.setProperty('--rotate-before', '45deg')
            e.style.setProperty('--top-after', '-1px')
            e.style.setProperty('--top-before', '1px')
        }, 200);
        e.setAttribute("state", "open")
    } else if(e.getAttribute("state") == "open"){
        
        e.style.setProperty('--height', '6px')
        e.style.setProperty('--rotate-after', '0deg')
        e.style.setProperty('--rotate-before', '0deg')
        e.style.setProperty('--top-after', '0')
        e.style.setProperty('--top-before', '0')
       
        setTimeout(() => {
            e.style.setProperty('width', '6px')
            e.style.setProperty('--left-after', '24px')
            e.style.setProperty('--left-before', '12px')
            e.style.setProperty('--width', '6px')
            e.style.setProperty('margin-left', '0')
        }, 200);
        e.setAttribute("state", "closed")
    }
}

function animateListItem(e, state){
    if(state == "closed"){
        e.style.setProperty('right', "150px")
    } else if(state == "open"){
        e.style.setProperty('right', "0")
    }
    

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
    if (event.key === "Enter") {
        gradient.randomizeColors()
        setBodyGradient()
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
}

/**
 * Removes the color from both the list and the color gradient
 * @param {HTMLElement} e - The button element that is a child of the li element to remove
 * @param {string} ID - ID of the color to remove
 */
function removeColor(e, ID){
    e.parentNode.remove();
    gradient.removeColorFromGradient(ID)
    setBodyGradient()
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
}

/**
 * Updates the DOM style gradient on the body element
 */
function setBodyGradient(){
    document.getElementsByTagName("body")[0].style.backgroundImage = gradient.gradient

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
    //create elements
    const li = document.createElement('li');
    //const br = document.createElement('br')
    const r = document.createElement('input')
    const g = document.createElement('input')
    const b = document.createElement('input')

    const rgbSpan = document.createElement('span')
    const p = document.createElement('span')
    const c1 = document.createElement('span')
    const c2 = document.createElement('span')

    const settingsIconBackground = document.createElement('div')
    const settingsIcon = document.createElement('div')

    const button = document.createElement('input')

    rgbSpan.innerHTML = "rgb("
    p.innerHTML = ")"
    c1.innerHTML = ", "
    c2.innerHTML = ", "

    //Add attributes to elements
    r.setAttribute("color-ID", ID)
    r.setAttribute("color", "r")
    r.setAttribute("class", "color-input")
    r.setAttribute("type", "text")

    g.setAttribute("color-ID", ID)
    g.setAttribute("color", "g")
    g.setAttribute("class", "color-input")
    g.setAttribute("type", "text")

    b.setAttribute("color-ID", ID)
    b.setAttribute("color", "b")
    b.setAttribute("class", "color-input")
    b.setAttribute("type", "text")

    settingsIconBackground.setAttribute("class", "color-settings-icon-background")
    settingsIconBackground.setAttribute("onClick", "toggleSettings(this)")
    settingsIcon.setAttribute("state", "closed")
    settingsIcon.setAttribute("class", "color-settings-icon")

    button.setAttribute("type", "button")
    button.setAttribute("onclick", "removeColor(this, " + ID + ")")
    button.setAttribute("value", "delete")


    li.setAttribute("color-ID", ID)
    //Add children to li

    settingsIconBackground.appendChild(settingsIcon)

    //li.appendChild(br)
    li.appendChild(rgbSpan)
    li.appendChild(r)
    li.appendChild(c1)
    li.appendChild(g)
    li.appendChild(c2)
    li.appendChild(b)
    li.appendChild(p)
    li.appendChild(settingsIconBackground)
    //li.appendChild(button)

    ul.appendChild(li)
}