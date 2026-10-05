export function element<K extends keyof HTMLElementTagNameMap>(tag: K, text?: string, className?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
export function button(text: string, action: () => void, className = 'button secondary compact'): HTMLButtonElement {
  const node = element('button',text,className); node.type='button'; node.addEventListener('click',action); return node;
}
export function field(label: string, input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): HTMLLabelElement {
  const node=element('label',undefined,'field'); node.append(element('span',label),input); return node;
}
export function input(type: string, value=''): HTMLInputElement {
  const node=element('input'); node.type=type; node.value=value; return node;
}
