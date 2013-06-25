   _    _       _    _____   ____    _  __   __
  / \  / \     / \  |_   _| | _  |  | | \ \_/ /
 /   \/   \   / _ \   | |   | __ \  | |  | _ | 
/__/\__/\__\ /_/ \_\  |_|   |_| \_\ |_| /_/ \_\
    
[![Build Status](https://travis-ci.org/mparke/matrix.png)](https://travis-ci.org/mparke/matrix)

A JavaScript 2 dimensional array module

### Instantiation
<pre>
  <code>
    var matrix = new Matrix(2, 2, [{}, {}, {}, {}]);
  </code>
</pre>

### API
- <code>size()</code>
- <code>getAt(xIndex, yIndex)</code>
- <code>push(val)</code>
- <code>pop()</code>
- <code>find(function(){ return true; })</code>
- <code>each(function(){})</code>