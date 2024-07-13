export function getCustomProperty(elem: HTMLElement, prop: string) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(
  elem: HTMLElement,
  prop: string,
  value: string
) {
  elem.style.setProperty(prop, value);
}

export function incrementCustomProperty(
  elem: HTMLElement,
  prop: string,
  inc: number
) {
  setCustomProperty(
    elem,
    prop,
    Number(getCustomProperty(elem, prop)) + inc + ""
  );
}
