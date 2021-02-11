export default class Popup {
  constructor() {
    const wrapper = document.querySelector('.wrapper');
    const popup = this;

    popup.popOverlay = document.createElement('div');
    popup.modal = document.createElement('div');
    popup.content = document.createElement('div');
    popup.close = document.createElement('button');

    popup.popOverlay.classList.add('popup__overlay');
    popup.modal.classList.add('popup__modal');
    popup.content.classList.add('popup__content');
    popup.close.classList.add('popup__close');

    document.body.insertBefore(popup.popOverlay, wrapper);
    document.body.insertBefore(popup.modal, wrapper);
    popup.modal.appendChild(popup.content);

    popup.open = function() {
      const openPopup = document.querySelectorAll('body');
      console.log(openPopup);

      openPopup.forEach(open => {
        const handleClick = function(e) {
          e.preventDefault();

          popup.popOverlay.classList.add('popup-overlay-active');
          popup.modal.classList.add('popup-modal-active');

          popup.content.innerHTML = ``;

          document.body.style.overflow = 'hidden';
          wrapper.classList.add('blur');
          console.log(true);
        };
        open.addEventListener('click', handleClick);
        open.parentNode.addEventListener('click', handleClick);
      });

      return popup;
    };

    popup.close = function() {
      popup.popOverlay.classList.remove('popup-overlay-active');
      popup.modal.classList.remove('popup-modal-active');
      wrapper.classList.remove('blur');
      popup.content.innerHTML = '';
      document.body.style.overflow = 'unset';
      return popup;
    };

    popup.popOverlay.onclick = popup.close;
    popup.modal.onclick = popup.close;
  }
}
