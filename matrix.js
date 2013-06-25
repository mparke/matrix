// 
(function(){
  var root = this;
  
  var Matrix = function(xSize, ySize, data){
    this.xSize = xSize;
    this.ySize = ySize;
    this.initialize(data);
  };
  
  var asMatrix = (function(){
    var mx = [];

    function initialize(data){
      var x = this.xSize, 
        y = this.ySize;

      for(var i = 0; i < y; i++){
        if(data.length > 0){
          mx[i] = [];
  
          for(var j = 0; j < x; j++){
            if(data.length > 0){
              mx[i][j] = data.shift();
            }
          }
        }
      }      
    }

    function size(){
      var yLen = mx.length,
        xLen = 0;

      for(var i = 0; i < yLen; i++){
        xLen += mx[i].length;
      }

      return xLen;
    }

    function getAt(x, y){
      return mx[y][x];
    }

    function pop(){
      var yLen = mx.length,
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
      var yLen = mx.length,
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
      var yLen = mx.length,
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
      var yLen = mx.length,
        row, xLen;

      for(var i = 0; i < yLen; i++){
        row = mx[i];
        xLen = row.length;

        for(var j = 0; j < xLen; j++){
          fn(row[j]);
        }
      }
    }

    return function(){
      this.getAt = getAt;
      this.size = size;
      this.initialize = initialize;
      this.push = push;
      this.pop = pop;
      this.find = find;
      this.each = each;
      return this;
    };
  })();
  
  asMatrix.call(Matrix.prototype);
  root.Matrix = Matrix;
}).call(this);