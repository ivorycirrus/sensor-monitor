
var RingArray = {
	_size : 0,
	_arrayPointer : 0,
	_arrayLoopCounter : 0,
	_innerArray : null,

	getInstance : function(size){
		if(isNaN(size)) return null;
		if(size<1) return null;
		var _instance = Object.create(RingArray);
		_instance._size = size;
		_instance._innerArray = new Array(size);
		return _instance;
	},

	put: function(obj){
		this._innerArray[this._arrayPointer] = obj;
		this._arrayPointer++;
		if(this._arrayPointer>=this._size) {
			this._arrayPointer = 0;
			this._arrayLoopCounter++;
		}
	},

	get: function(position){
		if(arguments.length==0) return this._innerArray[this._arrayPointer-1];
		if( position > ( this._arrayLoopCounter * this._size + this._arrayPointer ) ) return null;
		if( position < ( (this._arrayLoopCounter*this._size+this._arrayPointer) - this._size ) ) return null;
		
		var itemPosition = position - this._arrayLoopCounter*this._size;
		if(itemPosition<0) itemPosition = this._size + itemPosition;

		return this._innerArray[itemPosition];
	},

	startIndex: function(){
		var ret = (this._arrayLoopCounter*this._size+this._arrayPointer) - this._size;
		return ret<0?0:ret;		
	},

	lastIndex: function(){
		var ret = this._size*this._arrayLoopCounter+this._arrayPointer - 1;
		return ret<0?0:ret;
	},

	toArray: function(){
		var arraySize = this._size;
		if(this._size>(this.lastIndex()+1)) arraySize = this._arrayPointer;
		var ret = new Array(arraySize);

		if(arraySize !==0 ){
			var startInx = this.startIndex();
			for(var inx = 0; inx < arraySize ; inx++){
				ret[inx] = this.get(startInx+inx);
			}
		}

		return ret;
	}
};

exports.getInstance = RingArray.getInstance;

