<pre>
   _    _       _    _____   ____    _  __   __
  / \  / \     / \  |_   _| | _  |  | | \ \_/ /
 /   \/   \   / _ \   | |   | __ \  | |  | _ | 
/__/\__/\__\ /_/ \_\  |_|   |_| \_\ |_| /_/ \_\
</pre>

A JavaScript 2 dimensional array module
[![Build Status](https://travis-ci.org/mparke/matrix.png?branch=master)](https://travis-ci.org/mparke/matrix)

### Instantiation
<pre>
   <code>
     // Matrix(rowSize, data)
     // create a 2 x 2 matrix
     var matrix = new Matrix(2, [1, 2, 3, 4]);
     
     // internal representation
     [
       [ 1, 2 ],
       [ 3, 4 ]
     ]
   </code>
</pre>

### API
- <code>size()</code>
- <code>getAt(rowIndex, colIndex)</code>
- <code>push(val)</code>
- <code>pop()</code>
- <code>reset() //optional param [] to reset with new data</code>
- <code>find(function(val){ return true; })</code>
- <code>each(function(val){})</code>
