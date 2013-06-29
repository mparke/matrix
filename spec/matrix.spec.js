describe('Matrix', function(){

  // create a 40 x 60 (2400 size) matrix
  beforeEach(function(){
    var width = 20,
      height = 20,
      mapHeight = 800, 
      mapWidth = 1200,
      i = 0,
      j = 0,
      data = [];

    while(i < mapHeight){
      
      while(j < mapWidth){
        data.push({
          x: j,
          y: i
        });
        j += width;
      }

      j = 0;
      i += height;
    }

    this.matrix = new Matrix(40, 60, data);
  });

  it('should be initialized with properties and methods', function(){
    var mx = this.matrix;

    // verify public attributes
    expect(mx.mx).toBeDefined();
    expect(mx.xSize).toBe(40);
    expect(mx.ySize).toBe(60);

    // verify api
    expect(mx.getAt).toBeDefined();
    expect(typeof mx.getAt).toBe('function');
    expect(mx.size).toBeDefined();
    expect(typeof mx.size).toBe('function');
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
    expect(Array.isArray(mx.data())).toBe(true);
  });

  it('should be able to return a size', function(){
    var mx = this.matrix;
    expect(mx.size()).toBe(2400);
  });

  it('should be able to get a value at an x, y index', function(){
    var mx = this.matrix;
    expect(mx.getAt(0, 0)).toBeDefined();
    expect(mx.getAt(0, 0).x).toBe(0);
    expect(mx.getAt(0, 0).y).toBe(0);

    expect(mx.getAt(1, 0)).toBeDefined();
    expect(mx.getAt(1, 0).x).toBe(20);
    expect(mx.getAt(1, 0).y).toBe(0);

    expect(mx.getAt(39, 0)).toBeDefined();
    expect(mx.getAt(39, 0).x).toBe(780);
    expect(mx.getAt(39, 0).y).toBe(0);

    expect(mx.getAt(0, 59)).toBeDefined();
    expect(mx.getAt(0, 59).x).toBe(400);
    expect(mx.getAt(0, 59).y).toBe(780);

    expect(mx.getAt(39, 59)).toBeDefined();
    expect(mx.getAt(39, 59).x).toBe(1180);
    expect(mx.getAt(39, 59).y).toBe(780);
  });

  it('should be able to pop a value', function(){
    var mx = this.matrix;

    var removed = mx.pop();
    expect(mx.size()).toBe(2399);
    expect(removed).toBeDefined();
    expect(removed.x).toBe(1180);
    expect(removed.y).toBe(780);

    expect(mx.getAt(38, 59)).toBeDefined();
    expect(mx.getAt(38, 59).x).toBe(1160);
    expect(mx.getAt(38, 59).y).toBe(780);

    removed = mx.pop();
    expect(mx.size()).toBe(2398);
    expect(removed).toBeDefined();
    expect(removed.x).toBe(1160);
    expect(removed.y).toBe(780);

    expect(mx.getAt(37, 59)).toBeDefined();
    expect(mx.getAt(37, 59).x).toBe(1140);
    expect(mx.getAt(37, 59).y).toBe(780);
  });

  it('should be able to push a value', function(){
    var mx = this.matrix;

    // should create a new row
    mx.push({x:200, y:977, test:'test', empty: null})
    expect(mx.size()).toBe(2401);
    expect(mx.getAt(0, 60)).toBeDefined();
    expect(mx.getAt(0, 60).x).toBe(200);
    expect(mx.getAt(0, 60).y).toBe(977);
    expect(mx.getAt(0, 60).test).toBe('test');
    expect(mx.getAt(0, 60).empty).toBe(null);

    // should add to the new row
    mx.push({one:1});
    expect(mx.size()).toBe(2402);
    expect(mx.getAt(1, 60)).toBeDefined();
    expect(mx.getAt(1, 60).one).toBe(1);

    // should add to the new row
    mx.push(null);
    expect(mx.size()).toBe(2403);
    expect(mx.getAt(2, 60)).toBeDefined();
    expect(mx.getAt(2, 60)).toBeNull();

    // should add to the new row
    mx.push({something:'else'});
    expect(mx.size()).toBe(2404);
    expect(mx.getAt(3, 60)).toBeDefined();
    expect(mx.getAt(3, 60).something).toBe('else');
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