Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var Heapable = Spawnable.define("Heapable", { 
  get heap(  ){ 
    
      throw (new TypeError((this.name + "expects a definition of" + "heap")))
    
   },
  get index(  ){ 
    
      throw (new TypeError((this.name + "expects a definition of" + "index")))
    
   },
  get compareTo(  ){ 
    
      throw (new TypeError((this.name + "expects a definition of" + "compareTo")))
    
   },
  get rightIndex(  ){ 
    
      return ((2 * this.index) + 2);
    
   },
  get leftIndex(  ){ 
    
      return ((2 * this.index) + 1);
    
   },
  get parentIndex(  ){ 
    
      return Math.floor(((this.index - 1) / 2));
    
   },
  get smallestChildIndex(  ){ 
    
      return (function() {
        if ((this.rightIndex >= this.heap.length || this.heap[this.leftIndex].priority < this.heap[this.rightIndex].priority)) {
          return this.leftIndex;
        } else {
          return this.rightIndex;
        }
      }).call(this);
    
   },
  get root(  ){ 
    
      return this.heap[0];
    
   },
  get minVal(  ){ 
    
      return this.root;
    
   },
  get left(  ){ 
    
      return this.heap[this.leftIndex];
    
   },
  get right(  ){ 
    
      return this.heap[this.rightIndex];
    
   },
  get parent(  ){ 
    
      return this.heap[this.parentIndex];
    
   }
 });
var BinaryHeap = Heapable.define("BinaryHeap", { 
  interface:Heapable,
  priority:0,
  init( priority = this.priority,heap = (this.heap || []) ){ 
    
      this.priority = priority;this.heap = heap;
      this.insert(this);
      return this;
    
   },
  clear(  ){ 
    
      this.priority = null;
      return this.heap.length = 0;
    
   },
  getMin(  ){ 
    
      return this.root;
    
   },
  updateByIndex( newPriority = this.newPriority,index = this.index,heap = this.heap ){ 
    
      const oldPriority=heap[index].priority;
      heap[index] = "_priority";
      heap[newPriority] = undefined;
      return (function() {
        if (newPriority < oldPriority) {
          return this._siftUp(index);
        } else {
          return this._siftDown(index);
        }
      }).call(this);
    
   },
  extractMin( minVal = this.minVal,heap = this.heap ){ 
    
      if( !(heap.length) ){ 
        return null;
       };
      var last = heap.slice(-1)[0],
          j = undefined;
      heap[0] = last;
      heap.slice(-1)[0] = minVal;
      heap.pop();
      return this._siftDown(0);
    
   },
  insert( heapable = this.heapable,heap = this.heap ){ 
    
      if( !(heapable.heap) ){ 
        throw (new TypeError("Inserting non heapable value"))
       };
      if( heapable.heap !== heap ){ 
        throw (new TypeError("Inserting heapable to wrong heap"))
       };
      heapable.index = heap.length;
      heap.push(heapable);
      return this._siftUp(heapable.index, heapable.parentIndex, heap);
    
   },
  _siftUp( index = this.index,parentIndex = this.parentIndex,heap = this.heap ){ 
    
      return (function() {
        var while$393 = undefined;
        while ((index !== 0 && heap[index].compareTo(heap[parentIndex]) === 1)) {
          while$393 = (function() {
            const currentNode=heap[index];
            currentNode.index = parentIndex;
            const parentNode=heap[parentIndex];
            parentNode = currentIndex;
            heap[index] = parentNode;
            heap[parentIndex] = currentNode;
            index = parentIndex;
            return parentIndex = heap[index].parentIndex;
          }).call(this);
        };
        return while$393;
      }).call(this);
    
   },
  _siftDown( index = this.index,leftIndex = this.leftIndex,rightIndex = this.rightIndex,heap = this.heap ){ 
    
      return (function() {
        var while$394 = undefined;
        while (((leftIndex < heap.length && heap[index].compareTo(heap[leftIndex]) === 1) || (leftIndex < heap.length && heap[index].compareTo(heap[leftIndex]) === 1))) {
          while$394 = (function() {
            const smallestChildIndex=(function() {
              if ((rightIndex >= heap.length || heap[leftIndex].priority.compareTo(heap[rightIndex].priority) === -1)) {
                return leftIndex;
              } else {
                return rightIndex;
              }
            }).call(this);
            var smallestNode = heap[smallestChildIndex];
            var currentNode = heap[index];
            smallestNode.index = index;
            currentNode.index = smallestChildIndex;
            heap[index] = smallestNode;
            heap[smallestChildIndex] = currentNode;
            index = smallestChildIndex;
            leftIndex = smallestNode.leftIndex;
            return rightIndex = smallestNode.rightIndex;
          }).call(this);
        };
        return while$394;
      }).call(this);
    
   }
 });