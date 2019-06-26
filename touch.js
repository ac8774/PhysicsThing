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
  trackedTouches[touch.id] = {start: touch};
  startTouch(touch);
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



function QueryCallback(point) {
  this.point = point;
  this.fixtures = [];
}

QueryCallback.prototype.ReportFixture = function(fixture) {
  if (fixture.TestPoint(this.point)) {
    this.fixtures.push(fixture);
  }
  return false;
};

function fixturesAt(p) {
  var aabb = new b2AABB;
  var d = new b2Vec2;
  d.Set(0.01, 0.01);
  b2Vec2.Sub(aabb.lowerBound, p, d);
  b2Vec2.Add(aabb.upperBound, p, d);

  var queryCallback = new QueryCallback(p);
  world.QueryAABB(queryCallback, aabb);
  return queryCallback.fixtures;
}
