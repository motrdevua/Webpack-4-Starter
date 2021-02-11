import $ from 'jquery';
import Popup from './popup';

window.addEventListener('load', () => {
  console.log($);
  const popup = new Popup();
  popup.open();
});
