Sympathy = {};
Sympathy.Emitter = function(initialValue){
  var value = initialValue;

  var emitter = function e(newValue){
  
    if(typeof newValue !== 'undefined'){
      value = newValue;
      e.trigger('change', e);
    }
    
    return value;
  };
  
  _.extend(emitter, Backbone.Events);
  
  return emitter;
};

Sympathy.link = function(internal, element){
  internal.bind('change', function(){
    element.value = internal();
  });
  $(element).change(function(){
    internal( parseFloat(element.value) );
  });
}