// Matrix: Copyright (c) 2013 Matthew Parke mparke78@gmail.com
(function(){
  var root = this;
  
  var Matrix = function(xSize, data){
    this.mx = [];
    
    if(typeof xSize === 'number' && xSize > 0){
      this.xSize = xSize;
      if(Array.isArray(data)){
        this.initialize(data);
      }
    }else{
      throw new Error('Row size must be greater than 0.')
    }
  };
  
  var asMatrix = (function(){

    function initialize(data){
      var x = this.xSize,
        mx = this.mx,
        total = data.length,
        i = 0,
        j = 0;
      
      while(data.length > 0){
        mx[i] = [];
        while(j < x){
          if(data.length > 0){
            mx[i].push(data.shift());
          }
          ++j;
        }
        j = 0;
        ++i;
      }      
    }

    function reset(data){
      this.mx.splice(0, this.mx.length);
      if(Array.isArray(data)){
        this.initialize(data);
      }
    }

    function size(){
      var mx = this.mx,
        yLen = mx.length,
        xLen = 0;

      for(var i = 0; i < yLen; i++){
        xLen += mx[i].length;
      }

      return xLen;
    }

    function getAt(x, y){
      return this.mx[x][y];
    }

    function pop(){
      var mx = this.mx,
        yLen = mx.length,
        removed,
        row;

      if(yLen > 0){
        // there exists a row to check from
        row = mx[yLen - 1];

        if(row.length > 0){
          removed = row.pop();
          if(row.length === 0){
            mx.pop()
          }
        }else{
          //empty row, remove the row!
          mx.pop();
          return pop();
        }
      }

      return removed;
    }

    function push(val){
      var mx = this.mx,
        yLen = mx.length,
        row, xLen;

      if(yLen > 0){
        // get the last row
        row = mx[yLen - 1];
        xLen = row.length;
        
        // if the row is not full, push
        if(xLen < this.xSize){
          row.push(val);
        }else{
          mx.push([val]);
        }
      }else{
        mx.push([val]);
      }    
    }

    function find(comparator){
      var mx = this.mx,
        yLen = mx.length,
        result = -1,
        row, xLen, current;

      for(var i = 0; i < yLen; i++){
        row = mx[i];
        xLen = row.length;

        for(var j = 0; j < xLen; j++){
          current = row[j];
          if(comparator(current, j, i, mx)){
            return current;
          }
        }
      }

      return result;
    }

    function each(fn){
      var mx = this.mx,
        yLen = mx.length,
        row, xLen;

      for(var i = 0; i < yLen; i++){
        row = mx[i];
        xLen = row.length;

        for(var j = 0; j < xLen; j++){
          fn(row[j]);
        }
      }
    }

    function data(){
      return this.mx;
    }

    return function(){
      this.getAt = getAt;
      this.size = size;
      this.initialize = initialize;
      this.reset = reset;
      this.push = push;
      this.pop = pop;
      this.find = find;
      this.each = each;
      this.data = data;
      return this;
    };
  })();
  
  asMatrix.call(Matrix.prototype);
  root.Matrix = Matrix;
}).call(this);