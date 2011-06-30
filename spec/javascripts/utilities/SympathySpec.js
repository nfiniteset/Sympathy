describe('Sympathy', function(){
  
  this.emitter;
  this.rangeElement;
  
  beforeEach(function(){
    this.emitter = new Sympathy.Emitter(10);

    this.rangeElement = document.createElement('input');
    this.rangeElement.setAttribute('type', 'range');

    this.inputElement = document.createElement('input');
    
    this.spanElement = document.createElement('span');
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
    describe("data types", function(){
      it('can use a floating point number', function(){
        var emitter = new Sympathy.Emitter(10.01);
        emitter.link(this.inputElement);
        this.inputElement.value = 12.21;
        this.inputElement.onchange({target: this.inputElement});
        expect(emitter()).toEqual(12.21);
      });
      
      it('can use an integer', function(){
        var emitter = new Sympathy.Emitter(123);
        emitter.link(this.inputElement);
        this.inputElement.value = 345;
        this.inputElement.onchange({target: this.inputElement});
        expect(emitter()).toEqual(345);
      });
      
      it('can use a string', function(){
        var emitter = new Sympathy.Emitter("first");
        emitter.link(this.inputElement);
        this.inputElement.value = "second";
        this.inputElement.onchange({target: this.inputElement});
        expect(emitter()).toEqual("second");
      });
      
      this.rangeElement.value = 25;
      $(this.rangeElement).change();
      expect(this.emitter()).toEqual(25);
    });
  })
  
});