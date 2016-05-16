
var Counter = function() {
	this.count = 0;
};

Counter.prototype.increment = function()
{
	this.count = this.count + 1;
	console.log(this.count);
}

module.exports = new Counter();
