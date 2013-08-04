var assert = require('assert'),
    ringArray = require('../util/RingArray.js');	

suite('RingArray.js',function(){
	suiteSetup(function(){
		// setup code here
	});

	suite('getInstance',function(){
		test("Get RingArray instance with array size 5",function(){
			var i = ringArray.getInstance(5);
			assert.notEqual(null,i);
			assert.equal(5, i._size);
		});
		test("Return null with negative array size", function(){
			var i = ringArray.getInstance(-5);
			assert.equal(null,i);
		});
		test("Return null with array size 0", function(){
			var i = ringArray.getInstance(0);
			assert.equal(null,i);
		});
		test("Return null with nun-numerical array size", function(){
			var i = ringArray.getInstance("five");
			assert.equal(null,i);
		});
	});

	suite('put & get item',function(){
		test("Put 5 array items with no loop", function(){
			var arr = ringArray.getInstance(8);
			var testItem = [11,22,33,44,55];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(5,arr._arrayPointer);
			assert.equal(0,arr._arrayLoopCounter);
			assert.equal(11,arr._innerArray[0]);
			assert.equal(22,arr._innerArray[1]);
			assert.equal(33,arr._innerArray[2]);
			assert.equal(44,arr._innerArray[3]);
			assert.equal(55,arr._innerArray[4]);
		});
		test("Put 5 array items with a loop", function(){
			var arr = ringArray.getInstance(4);
			var testItem = [11,22,33,44,55];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(1,arr._arrayPointer);
			assert.equal(1,arr._arrayLoopCounter);
			assert.equal(55,arr._innerArray[0]);
			assert.equal(22,arr._innerArray[1]);
			assert.equal(33,arr._innerArray[2]);
			assert.equal(44,arr._innerArray[3]);
		});
		test("Get a last item",function(){
			var arr = ringArray.getInstance(8);
			var testItem = [11,22,33,44,55];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(55,arr._innerArray[4]);
			assert.equal(55,arr.get());
		});
		test("Put 7 item into array size 4, and get 3rd item",function(){
			var arr = ringArray.getInstance(4);
			var testItem = [11,22,33,44,55,66,77];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(3,arr._arrayPointer);
			assert.equal(1,arr._arrayLoopCounter);
			assert.equal(4,arr._size);
			assert.equal(null,arr.get(2));
		});
		test("Put 7 item into array size 4, and get 9th item",function(){
			var arr = ringArray.getInstance(4);
			var testItem = [11,22,33,44,55,66,77];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(3,arr._arrayPointer);
			assert.equal(1,arr._arrayLoopCounter);
			assert.equal(null,arr.get(8));
		});
		test("Put 5 item and get 4th, with no loop",function(){
			var arr = ringArray.getInstance(8);
			var testItem = [11,22,33,44,55];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(44,arr._innerArray[3]);
			assert.equal(44,arr.get(3));
		});
		test("Put 6 item into array size 4, and get 3rd item",function(){
			var arr = ringArray.getInstance(4);
			var testItem = [11,22,33,44,55,66];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(2,arr._arrayPointer);
			assert.equal(1,arr._arrayLoopCounter);
			assert.equal(33,arr.get(2));
		});
	});

	suite('startIndex',function(){
		test("start index with no loop", function(){
			var arr = ringArray.getInstance(10);
			var testItem = [11,22,33,44,55,66,77,88];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(8,arr._arrayPointer);
			assert.equal(0,arr._arrayLoopCounter);
			assert.equal(0,arr.startIndex());
		});
		test("start index with 2 loop", function(){
			var arr = ringArray.getInstance(7);
			var testItem = [11,22,33,44,55,66,77,88,99,00,111,222,33,444,555,666,777];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(3,arr._arrayPointer);
			assert.equal(2,arr._arrayLoopCounter);
			assert.equal(10,arr.startIndex());
		});
		test("start index when no array element", function(){
			var arr = ringArray.getInstance(10);
			assert.equal(0,arr._arrayPointer);
			assert.equal(0,arr._arrayLoopCounter);
			assert.equal(0,arr.startIndex());
		});
		test("start index when one array element", function(){
			var arr = ringArray.getInstance(10);
			arr.put(0);
			assert.equal(1,arr._arrayPointer);
			assert.equal(0,arr._arrayLoopCounter);
			assert.equal(0,arr.startIndex());
		});
	});
	
	suite('lastIndex', function(){
		test("last index with no loop", function(){
			var arr = ringArray.getInstance(10);
			var testItem = [11,22,33,44,55,66,77,88];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(8,arr._arrayPointer);
			assert.equal(0,arr._arrayLoopCounter);
			assert.equal(7,arr.lastIndex());
		});
		test("last index with 2 loop", function(){
			var arr = ringArray.getInstance(7);
			var testItem = [11,22,33,44,55,66,77,88,99,00,111,222,33,444,555,666,777];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(3,arr._arrayPointer);
			assert.equal(2,arr._arrayLoopCounter);
			assert.equal(16,arr.lastIndex());
		});
		test("last index when no array element", function(){
			var arr = ringArray.getInstance(10);
			assert.equal(0,arr._arrayPointer);
			assert.equal(0,arr._arrayLoopCounter);
			assert.equal(0,arr.lastIndex());
		});
		test("last index when one array element", function(){
			var arr = ringArray.getInstance(10);
			arr.put(0);
			assert.equal(1,arr._arrayPointer);
			assert.equal(0,arr._arrayLoopCounter);
			assert.equal(0,arr.lastIndex());
		});
	});

	suite('toArray', function(){
		test("convert to array with no loop, full elements", function(){
			var arr = ringArray.getInstance(5);
			var testItem = [11,22,33,44,55];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(0,arr._arrayPointer);
			assert.equal(1,arr._arrayLoopCounter);

			var extractedArray = arr.toArray();
			assert.equal(5,extractedArray.length);
			assert.equal(11,extractedArray[0]);
			assert.equal(22,extractedArray[1]);
			assert.equal(33,extractedArray[2]);
			assert.equal(44,extractedArray[3]);
			assert.equal(55,extractedArray[4]);
		});
		test("convert to array with no loop, with empty space", function(){
			var arr = ringArray.getInstance(5);
			var testItem = [11,22,33];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(3,arr._arrayPointer);
			assert.equal(0,arr._arrayLoopCounter);

			var extractedArray = arr.toArray();
			assert.equal(3,extractedArray.length);
			assert.equal(11,extractedArray[0]);
			assert.equal(22,extractedArray[1]);
			assert.equal(33,extractedArray[2]);
		});
		test("convert to array on empty array", function(){
			var arr = ringArray.getInstance(5);
			assert.equal(0,arr._arrayPointer);
			assert.equal(0,arr._arrayLoopCounter);

			var extractedArray = arr.toArray();
			assert.equal(0,extractedArray.length);
		});
		test("convert to array with a loop", function(){
			var arr = ringArray.getInstance(5);
			var testItem = [11,22,33,44,55,66,77,88];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(3,arr._arrayPointer);
			assert.equal(1,arr._arrayLoopCounter);

			var extractedArray = arr.toArray();
			assert.equal(5,extractedArray.length);
			assert.equal(44,extractedArray[0]);
			assert.equal(55,extractedArray[1]);
			assert.equal(66,extractedArray[2]);
			assert.equal(77,extractedArray[3]);
			assert.equal(88,extractedArray[4]);
		});
		test("convert to array with 2 loops, fine loop elements", function(){
			var arr = ringArray.getInstance(5);
			var testItem = [11,22,33,44,55,66,77,88,99,00];
			for (var inx = 0 ; inx < testItem.length ; inx++){
				arr.put(testItem[inx]);
			}
			assert.equal(0,arr._arrayPointer);
			assert.equal(2,arr._arrayLoopCounter);

			var extractedArray = arr.toArray();
			assert.equal(5,extractedArray.length);
			assert.equal(66,extractedArray[0]);
			assert.equal(77,extractedArray[1]);
			assert.equal(88,extractedArray[2]);
			assert.equal(99,extractedArray[3]);
			assert.equal(00,extractedArray[4]);
		});
	});
}); 
