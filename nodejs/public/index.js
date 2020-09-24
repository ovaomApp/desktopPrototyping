window.onload = function() {

const $elements = {
  '/corail/accelerometer': [
    document.querySelector('#corail-accelerometer-x'),
    document.querySelector('#corail-accelerometer-y'),
    document.querySelector('#corail-accelerometer-z'),
  ],
  '/corail/gyroscope': [
    document.querySelector('#corail-gyroscope-x'),
    document.querySelector('#corail-gyroscope-y'),
    document.querySelector('#corail-gyroscope-z'),
  ],
  '/corail/magnetometer': [
    document.querySelector('#corail-magnetometer-x'),
    document.querySelector('#corail-magnetometer-y'),
    document.querySelector('#corail-magnetometer-z'),
  ],
  '/corail/ui': [
    document.querySelector('#corail-ui-fsr1'),
    document.querySelector('#corail-ui-fsr2'),
    document.querySelector('#corail-ui-fsr3'),
    document.querySelector('#corail-ui-button'),
  ],
  '/bolstick/accelerometer': [
    document.querySelector('#bolstick-accelerometer-x'),
    document.querySelector('#bolstick-accelerometer-y'),
    document.querySelector('#bolstick-accelerometer-z'),
  ],
  '/bolstick/gyroscope': [
    document.querySelector('#bolstick-gyroscope-x'),
    document.querySelector('#bolstick-gyroscope-y'),
    document.querySelector('#bolstick-gyroscope-z'),
  ],
  '/bolstick/magnetometer': [
    document.querySelector('#bolstick-magnetometer-x'),
    document.querySelector('#bolstick-magnetometer-y'),
    document.querySelector('#bolstick-magnetometer-z'),
  ],
  '/bolstick/ui': [
    document.querySelector('#bolstick-ui-joystick-x'),
    document.querySelector('#bolstick-ui-joystick-y'),
    document.querySelector('#bolstick-ui-joystick-button'),
    document.querySelector('#bolstick-ui-blow-sensor'),
    document.querySelector('#bolstick-ui-button'),
  ],
}

const port = new osc.WebSocketPort({
  url: 'ws://localhost:9000',
});

port.on('message', function(oscMessage) {
  const { address, args } = oscMessage;
  const $els = $elements[address];
  if ($els && $els.length === args.length) {
    // let contents = '';
    // for (let i = 0; i < args.length; i++) {
    //   contents += `<div> ${args[i]} </div>`;
    // }
    // $elements[address].innerHTML = contents;
    for (let i = 0; i < args.length; i++) {
      $els[i].innerHTML = `${args[i]}`;
    }
  }
});

port.open();

};
