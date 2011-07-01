
$(document).ready(function(){
  var x = new Sympathy.Emitter(75);
  
  x.link(document.getElementById('xSpan'));
  x.link(document.getElementById('xRange'));
  x.link(document.getElementById('xField'));
  
});