describe('Sympathy', function(){
  
  this.emitter;
  this.rangeElement;
  
  beforeEach(function(){
    this.emitter = new Sympathy.Emitter(10);
    this.rangeElement = $('<input type="range" />')[0];
    $('jasmine_content').append(this.rangeElement);
  });
  
  describe('Emitter', function(){
    it('can be initialized with a value', function(){
      expect(this.emitter()).toEqual(10);
    });
    
    it('can be given a value', function(){
      this.emitter(15);
      expect(this.emitter()).toEqual(15);
    });
    
    it('triggers an event when it sets a new value', function(){
      var callback = jasmine.createSpy();
      
      this.emitter.bind('change', callback);
      expect(callback).not.toHaveBeenCalled();
      
      this.emitter(15);
      expect(callback).toHaveBeenCalled();
      expect(this.emitter()).toEqual(15);
    });
    
    it("doesn't trigger an event if set to existing value", function(){
      this.emitter(15);
      var callback = jasmine.createSpy();
      
      this.emitter.bind('change', callback);
      expect(callback).not.toHaveBeenCalled();
      
      this.emitter(15);
      expect(callback).not.toHaveBeenCalled();
      expect(this.emitter()).toEqual(15);
    });
    
    it("doesn't trigger an event if updated with silent", function(){
      var callback = jasmine.createSpy("callback");
      
      this.emitter.bind('change', callback);
      expect(callback).not.toHaveBeenCalled();
      
      this.emitter(15, {silent: true});
      expect(callback).not.toHaveBeenCalled();
      expect(this.emitter()).toEqual(15);
    });
    
  });
  
  describe('#link', function(){
    it('links an emitter and an input element', function(){
      this.emitter.link(this.rangeElement);
    }); 
    
    it('sets range when emitter changes', function(){
      this.emitter.link(this.rangeElement);
      
      this.emitter(75);
      expect(this.rangeElement.value).toEqual('75');
    });
    
    it('sets emitter when range changes', function(){
      this.emitter.link(this.rangeElement);
      
      this.rangeElement.value = 25;
      $(this.rangeElement).change();
      expect(this.emitter()).toEqual(25);
    });
  })
  
});