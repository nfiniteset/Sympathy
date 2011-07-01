
$(document).ready(function(){
  var x = new Bindable(75);
  
  x.bindElement(document.getElementById('xSpan'));
  x.bindElement(document.getElementById('xRange'));
  x.bindElement(document.getElementById('xField'));
  
});