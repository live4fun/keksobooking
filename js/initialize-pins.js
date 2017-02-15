'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');

  var pressEscBtn = function (evt) {
    if (window.checkEvents.checkPressedEsc(evt)) {
      hideDialog(evt);
    }
  };

  // Если нет активного маркера - скрыть поле с информацией
  // иначе - добавить возможность скрыть по нажатию escape

  var activePin = document.querySelector('.pin--active');
  if (!activePin) {
    dialog.style.display = 'none';
  } else {
    document.addEventListener('keydown', pressEscBtn);
  }

  var deactivatePin = function () {
    if (activePin) {
      activePin.setAttribute('aria-pressed', 'false');
      activePin.classList.remove('pin--active');
      activePin = null;
    }
  };

  var focusElement = null;

  var returnFocus = function () {
    activePin.focus();
  };

  var hideDialog = function (evt) {
    if (typeof focusElement === 'function') {
      focusElement();
    }
    deactivatePin();
    dialogClose.setAttribute('aria-pressed', 'true');
    dialog.style.display = 'none';
    document.removeEventListener('keydown', pressEscBtn);
  };

  var pressPin = function (evt, callback) {
    focusElement = callback;
    var element = evt.target.classList.contains('pin') ? evt.target : evt.target.parentElement;
    if (element !== activePin) {
      deactivatePin();
      element.classList.add('pin--active');
      activePin = element;
      element.setAttribute('aria-pressed', 'true');
      dialogClose.setAttribute('aria-pressed', 'false');
      window.showCard(dialog);
      document.addEventListener('keydown', pressEscBtn);
    }
  };

  pinMap.addEventListener('click', pressPin);
  pinMap.addEventListener('keydown', function (evt) {
    if (window.checkEvents.checkPressedEnter(evt)) {
      pressPin(evt, returnFocus);
    }
  });

  dialogClose.addEventListener('click', hideDialog);
  dialogClose.addEventListener('keydown', function (evt) {
    if (window.checkEvents.checkPressedEnter(evt)) {
      hideDialog(evt);
    }
  });
};
