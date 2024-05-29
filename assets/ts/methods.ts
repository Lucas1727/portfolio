import moment from "moment";

/** Get date string from timestamp
 * @param date - The date to convert
 * @param format - The format to use */
export const getDateString = function (date: number, format: string = 'DD-MM-YYYY HH:mm:ss') {
  return moment(date).format(format)
}

export const dragElement = function (htmlElement: HTMLElement) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (document.getElementById(htmlElement.id + "-navbar")) {
    document.getElementById(htmlElement.id + "-navbar").onmousedown = dragMouseDown;
  } else {
    htmlElement.onmousedown = dragMouseDown;
  }

  function dragMouseDown(element) {
    element = element || window.event;
    element.preventDefault();

    pos3 = element.clientX;
    pos4 = element.clientY;
    document.onmouseup = closeDragElement;

    document.onmousemove = elementDrag;
  }

  function elementDrag(element) {
    element = element || window.event;
    element.preventDefault();

    pos1 = pos3 - element.clientX;
    pos2 = pos4 - element.clientY;
    pos3 = element.clientX;
    pos4 = element.clientY;

    htmlElement.style.top = (htmlElement.offsetTop - pos2) + "px";
    htmlElement.style.left = (htmlElement.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}