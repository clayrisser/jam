import _ from 'lodash';

class JamImg extends HTMLElement {
  constructor() {
    super();
    CanvasRenderingContext2D.prototype.drawPixel = this.drawPixel;
    this.root = this.attachShadow({mode: 'open'});
    this.root.appendChild(this.render());
    this.props = {
      src: this.getAttribute('src')
    };
  }

  connectedCallback() {
    this.getBufferArray(this.props.src, {
      progress: (bufferArray) => {
        console.log(bufferArray);
      },
      success: (bufferArray) => {
        console.log(bufferArray);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  getBufferArray(src, events) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', src);
    xhr.overrideMimeType('text\/plain; charset=x-user-defined');
    xhr.onprogress = e => {
      let bufferArray = this.strToBufferArray(xhr.responseText);
      events.progress(bufferArray);
    };
    xhr.onload = e => {
      let bufferArray = this.strToBufferArray(xhr.responseText);
      events.success(bufferArray);
    };
    xhr.onerror = err => {
      events.error(err);
    };
    xhr.send();
  }

  strToBufferArray(str) {
    let bufferArray = new Uint8Array(new ArrayBuffer(str.length));
    _.times(str.length, i => {
      bufferArray[i] = str.charCodeAt(i) & 0xff;
    });
    return bufferArray;
  }

  attributeChangedCallback() {
    console.log('attribute changed');
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  renderCanvas() {
    let canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 100;
    canvas.style = 'border:1px solid #000000;width:100%';
    let ctx = canvas.getContext('2d');
    ctx.moveTo(0,0);
    ctx.drawPixel(0, 0, 'red');
    return canvas;
  }

  render() {
    let canvas = this.renderCanvas();
    return canvas;
  }

  drawPixel(x, y, color) {
    this.fillStyle = color;
    this.fillRect(x, y, 1, 1);
  }
}

window.addEventListener('WebComponentsReady', function() {
  window.customElements.define('jam-img', JamImg);
});
