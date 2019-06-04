function setupTouch() {
  canvas.addEventListener('mousedown', onTouchStartOrMouseDown);
  canvas.addEventListener('touchstart', onTouchStartOrMouseDown);

  window.addEventListener('mousemove', onTouchMoveOrMouseMove);
  window.addEventListener('touchmove', onTouchMoveOrMouseMove);

  window.addEventListener('mouseup', onTouchEndOrMouseUp);
  window.addEventListener('touchend', onTouchEndOrMouseUp);
}

var trackedTouches = [];

function onTouchStartOrMouseDown(event) {
  event.preventDefault();
  var touch = getAllMouseCoords(event)[0];
  trackedTouches[touch.id] = touch;
  setTimeout(function(){
    startTouch(touch);
  }, 50)
}

function onTouchMoveOrMouseMove(event) {
  var touches = getAllMouseCoords(event);
  for (var t = 0; t < touches.length; t++) {
    var touch = touches[t];
    moveTouch(touch);
  }
}

function onTouchEndOrMouseUp(event) {
  event.preventDefault();
  var touch = getAllMouseCoords(event)[0];
  console.log(Date.now() - trackedTouches[touch.id].time);
  trackedTouches[touch.id] = null;
  endTouch(touch);
}


function getAllMouseCoords(event) {
  if (event instanceof TouchEvent) {
    var ret = [];
    for (var touch = 0; touch < event.changedTouches.length; touch++) {
      ret.push(getMouseCoords(event.changedTouches[touch]))
    }
    return ret;
  } else {
    return [getMouseCoords(event)]
  }
}

function getMouseCoords(e) {
  var rect = canvas.getBoundingClientRect();
  var canvasX = e.clientX - rect.left;
  var canvasY = e.clientY - rect.top;
  var cameraX = (canvasX - camera.x) / camera.s;
  var cameraY = (camera.y - canvasY) / camera.s;
  return {
    canvasX: canvasX,
    canvasY: canvasY,
    p: new b2Vec2(cameraX, cameraY),
    id: e.identifier || 99,
    time: Date.now()
  };
}
