let winX = 0, winY = 0, mouseX = 0, mouseY = 0;
export let openElements: HTMLElement[] = reactive([]);

export function isElementOpen(element: HTMLElement) {

    return openElements.includes(element)
}

export function addElement(element: HTMLElement) {

    openElements.push(element);
}

export function getOpenElements() {
    return openElements;
}

export function removeElement(element: HTMLElement) {

    if (openElements.includes(element)) {
        delete openElements[openElements.indexOf(element)];
    }
}

export function bringElementToFront(htmlElement: HTMLElement) {
    htmlElement.style.zIndex = "8";

    openElements.forEach((app) => {
        if (app.id !== htmlElement.id) app.style.zIndex = "7";
    });
}

export function bringElementToBack(htmlElement: HTMLElement) {
    htmlElement.style.zIndex = "6";

    openElements.forEach((app) => {
        if (app.id !== htmlElement.id) app.style.zIndex = "7";
    });
}

export const dragElement = function (htmlElement: HTMLElement) {

    const element = document.getElementById(htmlElement.id + "-navbar");

    if (element) element!!.onmousedown = dragMouseDown; else htmlElement.onmousedown = dragMouseDown;

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

        bringElementToFront(htmlElement);
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export const centerElement = function (htmlElement: HTMLElement) {

    winX = (window.innerWidth / 2) - (htmlElement.offsetWidth / 2);
    winY = (window.innerHeight / 2) - (htmlElement.offsetHeight / 2);

    htmlElement.style.left = winX + "px";
    htmlElement.style.top = winY + "px";
}

export const resetElement = function (htmlElement: HTMLElement) {

    htmlElement.style.width = "40em";

    winX = (window.innerWidth / 2) - (htmlElement.offsetWidth / 2);
    winY = (window.innerHeight / 2) - (htmlElement.offsetHeight / 2);

    htmlElement.style.left = winX + "px";
    htmlElement.style.top = winY + "px";
}

export function openWindow(id: string) {
    const element = document.getElementById(id);

    if (!isElementOpen(element)) {
        addElement(element);
        bringElementToFront(element);
        element.style.animation = "maximize 0.25s linear forwards";
    }
}

export function closeWindow(id: any) {
    const element = document.getElementById(id) as HTMLElement;

    if (isElementOpen(element)) {
        removeElement(element)
        element.style.animation = "close 0.1s linear forwards";
        setTimeout(() => {
            resetElement(element);
        }, 100);
    }
}

export function sizeWindow(id: any) {
    const element = document.getElementById(id) as HTMLElement;

    if (isElementOpen(element)) {
        if (element.offsetWidth > 16 * 40) {
            element.style.width = "40em";
            centerElement(element);
        } else {
            element.style.width = "80em";
            centerElement(element);
        }
    }
}

export function toggleWindow(id: any) {
    const element = document.getElementById(id) as HTMLElement;

    if (isElementOpen(element) && element.style.zIndex == "8") {
        element.style.animation = "minimize 0.25s linear forwards";
        bringElementToBack(element);
    } else {
        bringElementToFront(element);
        element.style.animation = "maximize 0.25s linear forwards";
    }
}
