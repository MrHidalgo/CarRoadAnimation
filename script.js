// Create a timeline
// ====================
var tl = new TimelineMax(),
  tlMarker = new TimelineMax(),
  _path = MorphSVGPlugin.pathDataToBezier("#road-path path", {align: "#car-road"});

//
// ====================

// variable
// ====================

var _car = document.getElementById("car-road");

var _dataArrCoordinates = [],
  _idx = 1;

var _marker0 = document.getElementById("marker-desktop-0"),
  _marker1 = document.getElementById("marker-desktop-1"),
  _marker2 = document.getElementById("marker-desktop-2"),
  _marker3 = document.getElementById("marker-desktop-3"),
  _marker4 = document.getElementById("marker-desktop-4"),
  _marker5 = document.getElementById("marker-desktop-5"),
  _marker6 = document.getElementById("marker-desktop-6");
//
// ====================


// Main opt
// ====================
tl.set("#road-desktop-svg", {
  visibility: "visible"
});
tl.set(
  [
    _marker0, _marker1, _marker2, _marker3,
    _marker4, _marker5, _marker6
  ], {
    transformOrigin: 'center',
  }
);
tl.set(
  _car,
  {
    opacity: 0
  }
);
//
// ================


function detectObjectCoordinates(arrName) {
  arrName.forEach(function(val, idx) {
    _dataArrCoordinates.push(parseInt(document.getElementById(val).getBoundingClientRect().left));
  });

  return _dataArrCoordinates;
}
detectObjectCoordinates(["marker-desktop-0", "marker-desktop-1", "marker-desktop-2", "marker-desktop-3", "marker-desktop-4", "marker-desktop-5", "marker-desktop-6"]);


// Animate
// ====================

tl
  .to(_car, 0.25, {opacity: 1, ease: Power1.easeOut})
  .to(_marker0, 0.45, {opacity:1, scale: 1.25, ease: Power1.easeOut})
  .to(_marker0, 0.3, {scale: 1})
  .from(_car, 10, {
    bezier: {
      values:_path,
      type:"cubic",
      autoRotate: 180
    },
    onUpdate: function() {
      var _constOffset = 50,
        _carCoordinates = parseInt(_car.getBoundingClientRect().left);

      if ((_carCoordinates + _constOffset) >= (_dataArrCoordinates[_idx]) && (_dataArrCoordinates[_idx] <= (_carCoordinates + _constOffset))) {

        tlMarker
          .to(document.getElementById("marker-desktop-" + _idx), 0.45, {opacity:1, scale: 1.25, ease: Power1.easeOut})
          .to(document.getElementById("marker-desktop-" + _idx), 0.3, {scale: 1});

        _idx++
      }
    },
    ease: Power0.easeNone
  })
  .to(_car, 0.25, {opacity: 0, ease: Power1.easeOut}, "+=0.3");