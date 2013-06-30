describe('Matrix', function(){

  // create a 40 x 60 (2400 size) matrix
  beforeEach(function(){
    var width = 20,
      height = 20,
      totalWidth = 800, 
      totalHeight = 1200,
      x = 0,
      y = 0,
      data = [],
      resetData = [];

    while(y < totalHeight){
      while(x < totalWidth){
        data.push({ x: x, y: y });
        resetData.push({ x: x, y: y });
        x += width;
      }
      x = 0;
      y += height;
    }

    this.resetData = resetData;
    this.emptyMatrix = new Matrix(40);
    this.matrix = new Matrix(40, data);
  });

  it('should be initialized with properties and methods', function(){
    var mx = this.matrix;

    expect(this.emptyMatrix.mx).toBeDefined();
    expect(this.emptyMatrix.size()).toEqual(0);
    // verify public attributes
    expect(mx.mx).toBeDefined();
    expect(mx.xSize).toBe(40);

    // verify api
    expect(mx.getAt).toBeDefined();
    expect(typeof mx.getAt).toBe('function');
    expect(mx.size).toBeDefined();
    expect(typeof mx.size).toBe('function');
    expect(mx.reset).toBeDefined();
    expect(typeof mx.reset).toBe('function');
    expect(mx.push).toBeDefined();
    expect(typeof mx.push).toBe('function');
    expect(mx.pop).toBeDefined();
    expect(typeof mx.pop).toBe('function');
    expect(mx.find).toBeDefined();
    expect(typeof mx.find).toBe('function');
    expect(mx.each).toBeDefined();
    expect(typeof mx.each).toBe('function');
  });

  it('should return the matrix', function(){
    var mx = this.matrix;
    expect(mx.data()).toBeDefined();
    expect(Array.isArray(mx.data())).toEqual(true);
  });

  it('should be able to return a size', function(){
    var mx = this.matrix;
    expect(mx.size()).toEqual(2400);
  });

  it('should be able to reset', function(){
    var mx = this.matrix,
      emx = this.emptyMatrix;

    mx.reset();
    expect(mx.size()).toEqual(0);
    
    emx.reset(this.resetData);
    expect(emx.size()).toEqual(2400);
  });

  it('should be able to get a value at an index', function(){
    var mx = this.matrix;
    
    expect(mx.getAt(0, 0)).toBeDefined();
    expect(mx.getAt(0, 0).x).toBe(0);
    expect(mx.getAt(0, 0).y).toBe(0);

    expect(mx.getAt(1, 0)).toBeDefined();
    expect(mx.getAt(1, 0).x).toBe(0);
    expect(mx.getAt(1, 0).y).toBe(20);

    expect(mx.getAt(59, 0)).toBeDefined();
    expect(mx.getAt(59, 0).x).toBe(0);
    expect(mx.getAt(59, 0).y).toBe(1180);

    expect(mx.getAt(0, 39)).toBeDefined();
    expect(mx.getAt(0, 39).x).toBe(780);
    expect(mx.getAt(0, 39).y).toBe(0);

    expect(mx.getAt(59, 39)).toBeDefined();
    expect(mx.getAt(59, 39).x).toBe(780);
    expect(mx.getAt(59, 39).y).toBe(1180);
  });

  it('should be able to pop a value', function(){
    var mx = this.matrix;

    var removed = mx.pop();
    expect(mx.size()).toBe(2399);
    expect(removed).toBeDefined();
    expect(removed.x).toBe(780);
    expect(removed.y).toBe(1180);

    expect(mx.getAt(59, 38)).toBeDefined();
    expect(mx.getAt(59, 38).x).toBe(760);
    expect(mx.getAt(59, 38).y).toBe(1180);

    removed = mx.pop();
    expect(mx.size()).toBe(2398);
    expect(removed).toBeDefined();
    expect(removed.x).toBe(760);
    expect(removed.y).toBe(1180);

    expect(mx.getAt(59, 37)).toBeDefined();
    expect(mx.getAt(59, 37).x).toBe(740);
    expect(mx.getAt(59, 37).y).toBe(1180);
  });

  it('should be able to push a value', function(){
    var mx = this.matrix;

    // should create a new row
    mx.push({x:200, y:977, test:'test', empty: null})
    expect(mx.size()).toBe(2401);
    expect(mx.getAt(60, 0)).toBeDefined();
    expect(mx.getAt(60, 0).x).toBe(200);
    expect(mx.getAt(60, 0).y).toBe(977);
    expect(mx.getAt(60, 0).test).toBe('test');
    expect(mx.getAt(60, 0).empty).toBe(null);

    // should add to the new row
    mx.push({one:1});
    expect(mx.size()).toBe(2402);
    expect(mx.getAt(60, 1)).toBeDefined();
    expect(mx.getAt(60, 1).one).toBe(1);

    // should add to the new row
    mx.push(null);
    expect(mx.size()).toBe(2403);
    expect(mx.getAt(60, 2)).toBeDefined();
    expect(mx.getAt(60, 2)).toBeNull();

    // should add to the new row
    mx.push({something:'else'});
    expect(mx.size()).toBe(2404);
    expect(mx.getAt(60, 3)).toBeDefined();
    expect(mx.getAt(60, 3).something).toBe('else');
  });

  it('should be able to find an object using a comparator function', function(){
    var mx = this.matrix,
      result;

    // test first object
    result = mx.find(function(data, x, y, matrix){
      return data.x === 0;
    });
    expect(result === -1).toBe(false);

    // test for not found
    result = mx.find(function(data, x, y, matrix){
      return false;
    });
    expect(result).toBe(-1);

    // test mid values
    result = mx.find(function(data, x, y, matrix){
      return data.x === 240;
    });
    expect(result === -1).toBe(false);

    result = mx.find(function(data, x, y, matrix){
      return data.y === 780;
    });
    expect(result === -1).toBe(false);
  });

  it('should be able to iterate the matrix usig each', function(){
    var mx = this.matrix;
    var spy = jasmine.createSpy();

    mx.each(spy);
    expect(spy).toHaveBeenCalled();
    expect(spy.callCount).toBe(mx.size());
    expect(spy.mostRecentCall.args[0]).toBeDefined();
  });
});