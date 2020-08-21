function settingsIconAnimation(e){
    if(e.getAttribute("state") == "closed"){
        e.style.setProperty('--left-after', '0')
        e.style.setProperty('--left-before', '0')
        e.style.setProperty('--width', '14px')
        e.style.setProperty('margin-left', '6px')
    
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
        e.style.setProperty('right', "100px")
    } else if(state == "open"){
        e.style.setProperty('right', "0")
    }
}

function animateEditIcons(e, state){
    if(state == "closed"){
        e.style.setProperty('right', "30px")
    } else if(state == "open"){
        e.style.setProperty('right', "-70px")
    }
}

function removeAnimation(e){
    e.style.setProperty("right", "100%")
    let moveValue = e.offsetHeight + parseInt(window.getComputedStyle(e).marginTop, 10)
    setTimeout(() => {
        e.style.setProperty("margin-bottom", "-" + moveValue + "px")
    }, 500);
    
}

function animateLock(e){
    if(e.getAttribute("state") == "unlocked"){
        e.style.setProperty("--height", "0")
        e.style.setProperty("--lock", "-8px")
        e.parentNode.style.setProperty("--lock-c", "grey")
        e.setAttribute("state", "locked")
    } else if(e.getAttribute("state") == "locked"){
        e.style.setProperty("--height", "1")
        e.style.setProperty("--lock", "-12px")
        e.parentNode.style.setProperty("--lock-c", "rgb(223, 219, 0)")
        e.setAttribute("state", "unlocked")
    }
   
}