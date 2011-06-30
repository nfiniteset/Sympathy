Sympathy = {};
Sympathy.Emitter = function(initialValue){
  var value = initialValue;

  var emitter = function (newValue, opts){
    if (typeof opts == 'undefined') opts = {};
  
    if((typeof newValue !== 'undefined') && (newValue !== value)){
      value = newValue;
      
      if(!opts.silent){
        emitter.trigger('change', emitter);
      }
    }
    
    return value;
  };
  
  _.extend(emitter, Backbone.Events);
  
  emitter.link = function(element){
    emitter.bind('change', function(){
      element.value = emitter();
    });
    $(element).change(function(){
      emitter( parseFloat(element.value) );
    });
    var formatInternal = (function(){
      if(typeof value == 'number'){
        return function(val){ return parseFloat(val); }      
      } else {
        return function(val){return val;};
      }
    })();
  }
  
  return emitter;
};