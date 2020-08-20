/**
 * Init color values inkeyup event
 */
function newColor(){
    colors = document.querySelectorAll('[color-ID]')
    colors.forEach(color => {
        setValue(color)
        color.onkeyup = function(event){
            let ID = color.getAttribute("color-ID")
            let letter = color.getAttribute("color")
            if(checkValue(color.value, event.key, event.keyCode)){
                gradient.updateColorValue(ID, letter, color.value)
                setBodyGradient()
            } else{
                color.value = gradient.colors[ID][letter]
            }
            
            
        }
    
    });
    
}

/**
 * Sets the input value to the correct color value
 * @param {*} c - the input element
 */
function setValue(c){
    let ID = c.getAttribute("color-ID")
    let letter = c.getAttribute("color")
    c.value = gradient.colors[ID][letter]
}

/**
 * Check if the new entered value is correct
 * @param {*} value - recently added value
 * @param {*} key - the keybord key name
 * @param {*} keyCode - the keyboard key code
 */
function checkValue(value, key, keyCode){
    if(keyCode == 8){
        return true
    } else if (!isNaN(key) && (-1 < value & value < 256)){
        return true
    } else{
        return false
    }
}