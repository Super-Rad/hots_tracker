var mocker = require('mockery'),
	expect = require('chai').expect;

var Countermod;
var counter;
describe('Counter', function()
{
	
	beforeEach(function(){
		Countermod = require('./test_code.js');
		counter = new Counter();
	})

	it('should have count starting at zero', function(){
		var output =  counter.count;
		expect(output).to.equal(0);
	});
});