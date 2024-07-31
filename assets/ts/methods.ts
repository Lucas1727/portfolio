import moment from "moment";

/** Get date string from timestamp
 * @param date - The date to convert
 * @param format - The format to use */
export const getDateString = function (date: number, format: string = 'DD-MM-YYYY HH:mm:ss') {
  return moment(date).format(format)
}

let winX = 0, winY = 0, mouseX = 0, mouseY = 0;

export let openElements: HTMLElement[] = [];

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

    bringToFront(htmlElement);
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export const resetElement = function (htmlElement: HTMLElement) {

  winX = (window.innerWidth / 2) - (htmlElement.offsetWidth / 2);
  winY = (window.innerHeight / 2) - (htmlElement.offsetHeight / 2);

  htmlElement.style.left = winX + "px";
  htmlElement.style.top = winY + "px";
}

export const bringToFront = function (htmlElement: HTMLElement) {
  htmlElement.style.zIndex = "8";

  openElements.forEach((app) => {
    if (app.id !== htmlElement.id) app.style.zIndex = "7";
  });
}
