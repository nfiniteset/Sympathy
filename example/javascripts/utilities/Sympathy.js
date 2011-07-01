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
  
    var formatInternal = (function(){
      if(typeof value == 'number'){
        return function(val){ return parseFloat(val); }      
      } else {
        return function(val){return val;};
      }
    })();
  
    if(element.tagName == 'INPUT'){
      emitter.bind('change', function(){
        element.value = emitter();
      });
      element.onchange = function(){
        emitter( formatInternal(element.value) );
      };    
    } else {
      emitter.bind('change', function(){
        element.innerHTML = emitter().toString();
      });
    }

  }
  
  return emitter;
};