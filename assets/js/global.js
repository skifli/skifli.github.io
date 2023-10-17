function moveIsland(event) {
    event.preventDefault();

    let pos1 = event.clientX, pos2 = event.clientY, pos3 = 0, pos4 = 0;
    let element = event.target.parentElement;

    function onIslandMove(event) {
        event.preventDefault();

        pos3 = pos1 - event.clientX;
        pos4 = pos2 - event.clientY;
        pos1 = event.clientX;
        pos2 = event.clientY;

        element.style.top = (element.offsetTop - pos4) + "px";
        element.style.left = (element.offsetLeft - pos3) + "px";
    }
    
    function stopIslandMove() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
    
    document.onmousemove = onIslandMove;
    document.onmouseup = stopIslandMove;
}