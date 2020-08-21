/**
 * The controller.js is resposible for the connection to the interface. 
 * It handles the functions that is triggerd by button presses, keypressen
 */


function toggleSettings(e){
    console.log(e.getAttribute("open"));
    if(e.getAttribute("open") == "false"){
        e.style.setProperty('--left-after', '0')
        e.style.setProperty('--left-before', '0')
        e.style.setProperty('--width', '14px')
    
        setTimeout(() => {
            e.style.setProperty('width', '0')
            e.style.setProperty('--height', '4px')
            e.style.setProperty('--rotate-after', '-45deg')
            e.style.setProperty('--rotate-before', '45deg')
            e.style.setProperty('--top-after', '-1px')
            e.style.setProperty('--top-before', '1px')
        }, 300);
        e.setAttribute("open", "true")
    } else if(e.getAttribute("open") == "true"){
        
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
        }, 300);
        e.setAttribute("open", "false")
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
        setListItem(key, ul)  
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
    setListItem(ID, ul)
    newColor()
    setBodyGradient()
}

/**
 * Updates the DOM style gradient on the body element
 */
function setBodyGradient(){
    document.getElementsByTagName("body")[0].style.backgroundImage = gradient.gradient
}


/**
 * Creates the li its containing elements 
 * @param {string} ID 
 * @param {HTMLElement} ul 
 */
function setListItem(ID, ul){
    
    //create elements
    const li = document.createElement('li');
    const br = document.createElement('br')
    const r = document.createElement('input')
    const g = document.createElement('input')
    const b = document.createElement('input')

    const rSpan = document.createElement('span')
    const gSpan = document.createElement('span')
    const bSpan = document.createElement('span')

    const button = document.createElement('input')

    rSpan.innerHTML = "r: "
    gSpan.innerHTML = "g: "
    bSpan.innerHTML = "b: "
    
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

    button.setAttribute("type", "button")
    button.setAttribute("onclick", "removeColor(this, " + ID + ")")
    button.setAttribute("value", "delete")

    //Add children to li
    li.appendChild(br)
    li.appendChild(rSpan)
    li.appendChild(r)
    li.appendChild(gSpan)
    li.appendChild(g)
    li.appendChild(bSpan)
    li.appendChild(b)
    li.appendChild(button)

    ul.appendChild(li)
}