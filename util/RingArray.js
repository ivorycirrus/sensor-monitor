
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

		var itemPosition = position % this._size;
		if(itemPosition > this._arrayPointer) itemPosition = this._size - itemPosition;
		return this._innerArray[itemPosition];
	}
};

exports.getInstance = RingArray.getInstance;

