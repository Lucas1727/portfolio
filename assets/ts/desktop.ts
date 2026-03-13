let winX = 0, winY = 0, mouseX = 0, mouseY = 0;

export interface ElementEntry {
    element: HTMLElement;
    originalSize: { width: number; height: number };
}

export let openElements: ElementEntry[] = reactive([]);

export function isElementOpen(htmlElement: HTMLElement) {
    return openElements.some(entry => entry.element === htmlElement);
}

export function addElement(htmlElement: HTMLElement) {
    const element = {
        element: htmlElement,
        originalSize: {width: htmlElement.offsetWidth, height: htmlElement.offsetHeight}
    };
    openElements.push(element);
    console.log(element.originalSize)
}

export function getOpenElements() {
    return openElements;
}

export function getElementById(id: string) {
    return openElements.find(entry => entry.element.id === id) || null;
}

export function removeElement(htmlElement: HTMLElement) {
    const index = openElements.findIndex(entry => entry.element === htmlElement);
    if (index !== -1) {
        delete openElements[index];
    }
}

export function bringElementToFront(htmlElement: HTMLElement) {
    htmlElement.style.zIndex = "8";

    openElements.forEach(({element}) => {
        if (element.id !== htmlElement.id) element.style.zIndex = "7";
    });
}

export function bringElementToBack(htmlElement: HTMLElement) {
    htmlElement.style.zIndex = "6";

    openElements.forEach(({element}) => {
        if (element.id !== htmlElement.id) element.style.zIndex = "7";
    });
}

export function clickElement(htmlElement: HTMLElement) {

    const element = document.getElementById(htmlElement.id);

    if (element) element!!.onclick = () => bringElementToFront(element);
}

export function dragElement(htmlElement: HTMLElement) {

    // const element = document.getElementById(htmlElement.id + "-navbar");

    htmlElement.onmousedown = dragMouseDown;

    console.log(htmlElement.id + " is draggable");

    function dragMouseDown(mouseEvent: MouseEvent) {

        mouseEvent = mouseEvent || window.event;
        mouseEvent.preventDefault();

        mouseX = mouseEvent.clientX;
        mouseY = mouseEvent.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(mouseEvent: MouseEvent) {
        mouseEvent = mouseEvent || window.event;
        mouseEvent.preventDefault();

        winX = mouseX - mouseEvent.clientX;
        winY = mouseY - mouseEvent.clientY;
        mouseX = mouseEvent.clientX;
        mouseY = mouseEvent.clientY;

        htmlElement.style.left = (htmlElement.offsetLeft - winX) + "px";
        htmlElement.style.top = (htmlElement.offsetTop - winY) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export function centerElement(htmlElement: HTMLElement) {

    winX = (window.innerWidth / 2) - (htmlElement.offsetWidth / 2);
    winY = (window.innerHeight / 2) - (htmlElement.offsetHeight / 2);

    winY -= 20;

    htmlElement.style.left = winX + "px";
    htmlElement.style.top = winY + "px";
}

export function resetElement(htmlElement: HTMLElement) {

    htmlElement.style.width = "40em";

    winX = (window.innerWidth / 2) - (htmlElement.offsetWidth / 2);
    winY = (window.innerHeight / 2) - (htmlElement.offsetHeight / 2);

    htmlElement.style.left = winX + "px";
    htmlElement.style.top = winY + "px";
}

export function openWindow(id: string) {
    const element = document.getElementById(id);

    if (element && !isElementOpen(element)) {
        addElement(element);
        bringElementToFront(element);
        element.style.animation = "maximize 0.25s linear forwards";
    }
}

export function clickWindow(id: string) {
    const element = document.getElementById(id + "-navbar");

    if (element) clickElement(element);
}

export function dragWindow(id: string) {
    const element = document.getElementById(id + "-navbar");

    if (element) dragElement(element);
}

export function closeWindow(id: string) {
    const element = document.getElementById(id);

    if (element && isElementOpen(element)) {
        removeElement(element)
        element.style.animation = "close 0.1s linear forwards";
        setTimeout(() => {
            resetElement(element);
        }, 100);
    }
}

export function sizeWindow(id: string) {
    const element = document.getElementById(id);

    if (element && isElementOpen(element)) {
        if (element.offsetWidth > 16 * 40) {
            element.style.width = "40em";
            element.style.height = getElementById(element.id)?.originalSize.height + "px";
            centerElement(element);
        } else {
            element.style.width = "80em";
            element.style.height = "80em";
            centerElement(element);
        }
    }
}

export function toggleWindow(id: string) {
    const element = document.getElementById(id);

    if (element && isElementOpen(element)) {
        if (element.style.zIndex == "8") {
            element.style.animation = "minimize 0.25s linear forwards";
            bringElementToBack(element);
        } else {
            bringElementToFront(element);
            element.style.animation = "maximize 0.25s linear forwards";
        }
    }
}
