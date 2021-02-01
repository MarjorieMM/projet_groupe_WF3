import { Injectable } from '@angular/core';
declare let $: any;

@Injectable({
  providedIn: 'root',
})
export class NFrameService {
  // do all
  doAll() {
    this.drop();
    this.dropError();
    this.dropSuccess();
    this.hover();
    this.send();
    this.spinHover();
    this.validButton();
  }

  // drop
  drop() {
    $('[data-drop]').on('click', (e) => {
      for (let attribut of e.target.attributes) {
        if (attribut.name == 'data-drop') {
          let dataOfElementsToDrop = attribut.value;
          let elementDropped = $('[data-dropped=' + dataOfElementsToDrop + ']');
          elementDropped.css('display') == 'none'
            ? elementDropped.fadeIn(300)
            : elementDropped.fadeOut(300);
        }
      }
    });
  }

  // drop-error
  dropError() {
    $('[data-drop-error]').on('click', (e) => {
      for (let attribut of e.target.attributes) {
        if (attribut.name == 'data-drop-error') {
          let dataOfElementsToDrop = attribut.value;
          let elementDropped = $(
            '[data-dropped-error=' + dataOfElementsToDrop + ']'
          );
          elementDropped.addClass('--bg-danger');
          setTimeout(() => {
            elementDropped.fadeOut(300);
          }, 300);
        }
      }
    });
  }

  // drop-success

  dropSuccess() {
    $('[data-drop-success]').on('click', (e) => {
      for (let attribut of e.target.attributes) {
        if (attribut.name == 'data-drop-success') {
          let dataOfElementsToDrop = attribut.value;
          let elementDropped = $(
            '[data-dropped-success=' + dataOfElementsToDrop + ']'
          );
          elementDropped.addClass('--bg-success');
          setTimeout(() => {
            elementDropped.fadeOut(300);
          }, 300);
        }
      }
    });
  }

  // spinhover
  spinHover() {
    $('[data-spinhover]').on('mouseover', (e) => {
      $(e.target).css({
        transition: 'ease 0.5s',
        transform: 'rotateZ(360deg)',
      });
    });
    $('[data-spinhover]').on('mouseout', (e) => {
      $(e.target).css({
        transform: 'rotateZ(0deg)',
      });
    });
  }

  // hover effects

  hover() {
    $('[data-hover]').on('mouseover', (e) => {
      for (let attribut of e.target.attributes) {
        if (attribut.name == 'data-hover') {
          let classToAdd = attribut.value;
          $(e.target).addClass(classToAdd);
        }
      }
    });
    $('[data-hover]').on('mouseout', (e) => {
      for (let attribut of e.target.attributes) {
        if (attribut.name == 'data-hover') {
          let classToAdd = attribut.value;
          $(e.target).removeClass(classToAdd);
        }
      }
    });
  }

  // send effect

  send() {
    //first get scrollY
    let scrollTop = 0;
    $(window).scroll(function () {
      scrollTop = $(window).scrollTop();
    });

    $('[data-send]').on('click', (e) => {
      let sendTargetId = $(e.target).attr('data-send');

      // get  start X, Y position and start width and height
      let xPos = $(e.target).offset().left;
      let yPos = $(e.target).offset().top;
      let startWidth = $(e.target).width();
      let startHeight = $(e.target).height();
      let startXPadding = parseFloat($(e.target).css('padding-left'));
      let startYPadding = parseFloat($(e.target).css('padding-top'));
      let totalStartWidth = parseFloat(startWidth) + 2 * startXPadding;
      let totalStartHeight = parseFloat(startHeight) + 2 * startYPadding;
      // get end position
      let startPositionX = yPos + totalStartHeight / 2 - scrollTop - 5;
      let startPositionY = xPos + totalStartWidth / 2 - 5;

      // get X, Y postion and width and height values of the target
      let targetXPos = $('#' + sendTargetId).offset().left;
      let targetYPos = $('#' + sendTargetId).offset().top;
      let targetWidth = $('#' + sendTargetId).width();
      let targetHeight = $('#' + sendTargetId).height();
      let targetXPadding = $('#' + sendTargetId).css('padding-left');
      let targetYPadding = $('#' + sendTargetId).css('padding-top');
      let totalWidth = parseFloat(targetWidth) + 2 * parseFloat(targetXPadding);
      let totalHeight =
        parseFloat(targetHeight) + 2 * parseFloat(targetYPadding);
      // get end position
      let endPositionX = parseFloat(targetXPos) + totalWidth / 2 - 5;
      let endPositionY =
        parseFloat(targetYPos) + totalHeight / 2 - scrollTop - 5;

      // create element
      const element = document.createElement('div');
      $(element).css({
        width: '10px',
        height: '10px',
        'border-radius': '5px',
        position: 'fixed',
        top: startPositionX,
        left: startPositionY,
        transition: 'ease 0.7s',
        display: 'none',
        'z-index': '101',
      });
      $(element).addClass('bg-charter-pink');
      $('body').prepend(element);

      //animation
      $(element).fadeIn(200);
      setTimeout(() => {
        $(element).css({
          top: endPositionY,
          left: endPositionX,
        });
      }, 200);
      setTimeout(() => {
        $(element).fadeOut(200);
      }, 1000);
    });
  }

  // valid button click

  validButton() {
    $('[data-valid]').css({
      display: 'none',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
    });

    $('button').on('click', (e) => {
      $(e.target.querySelector('[data-valid]')).slideDown(300);
      setTimeout(() => {
        $(e.target.querySelector('[data-valid]')).slideUp(300);
      }, 1200);
    });
  }
}
