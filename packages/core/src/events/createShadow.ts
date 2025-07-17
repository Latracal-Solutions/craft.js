// Works partially with Linux (except on Chrome)
// We'll need an alternate way to create drag shadows
export const createShadow = (
  e: DragEvent,
  shadowsToCreate: HTMLElement[],
  forceSingleShadow: boolean = false
) => {
  // Set effectAllowed to none to prevent showing plus icons
  e.dataTransfer.effectAllowed = 'none';

  // Create an invisible 1x1 pixel element as drag image
  const invisibleElement = document.createElement('div');
  invisibleElement.style.width = '1px';
  invisibleElement.style.height = '1px';
  invisibleElement.style.position = 'absolute';
  invisibleElement.style.left = '-100%';
  invisibleElement.style.top = '-100%';
  invisibleElement.style.opacity = '0';
  document.body.appendChild(invisibleElement);
  e.dataTransfer.setDragImage(invisibleElement, 0, 0);
  console.log('invisibleElement', invisibleElement);
  return invisibleElement;
};
