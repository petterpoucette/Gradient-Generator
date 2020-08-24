function settingsIconAnimation(e){
    
    let state = (e.getAttribute("state") == "closed") ? false : (e.getAttribute("state") == "open") ? true : undefined
    let waitClosed = state ?  0 : 200
    let waitOpen = state ? 200 : 0
    
    setTimeout(() => {
        e.style.setProperty('width', state ? '6px' : '0')
    }, 200);

    setTimeout(() => {
        e.style.setProperty('--height', state ? '6px' : '4px')
        e.style.setProperty('--rotate-after',  state ? '0deg' : '-45deg')
        e.style.setProperty('--rotate-before', state ? '0deg' :'45deg')
        e.style.setProperty('--top-after', state ? '0' : '-1px')
        e.style.setProperty('--top-before', state? '0' : '1px')
    }, waitClosed);

    setTimeout(() => {
        e.style.setProperty('--left-after', state ? '24px' : '0')
        e.style.setProperty('--left-before', state ? '12px' :'0')
        e.style.setProperty('--width', state ? '6px' :'14px')
        e.style.setProperty('margin-left', state ? '0' :'6px')
    }, waitOpen);
    

    e.setAttribute("state", state ? "closed" : "open")
}

animateListItem = (e, state) => e.style.setProperty('right', 
                                state == "closed" ? "100px" : 
                                state == "open" ? "0": undefined)

animateEditIcons = (e, state) => e.style.setProperty('right', 
                                state == "closed" ? "30px" : 
                                state == "open" ? "-70px": undefined)


function removeAnimation(e){
    e.style.setProperty("right", "100%")
    let moveValue = e.offsetHeight + parseInt(window.getComputedStyle(e).marginTop, 10)
    setTimeout(() => {
        e.style.setProperty("margin-bottom", "-" + moveValue + "px")
    }, 500);
    
}

function animateLock(e){
    let state = (e.getAttribute("state") == "unlocked") ? false : (e.getAttribute("state") == "locked") ? true : undefined
    e.style.setProperty("--height", state ? "1" : "0")
    e.style.setProperty("--lock", state ? "-12px" : "-8px")
    e.parentNode.style.setProperty("--lock-c", state ? "rgb(223, 219, 0)" : "grey")
    e.setAttribute("state", state ? "unlocked" :  "locked")
}