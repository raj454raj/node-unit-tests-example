const SumThings = require('../sum.js').SumThings,
      assert = require('assert'),
      expect = require('chai').expect,
      sinon = require('sinon');


let sum = new SumThings();

describe("Test sum functionalities", function() {

  describe("addTwoNumbers", function() {

    it("returns sum of the numbers if arguments are valid numbers", function() {
      assert.equal(sum.addTwoNumbers(4, 5), 9);
      assert.equal(sum.addTwoNumbers(0, 5), 5);
      assert.equal(sum.addTwoNumbers(4.5, 5), 9.5);
      assert.equal(sum.addTwoNumbers(-5, 5), 0);
    });

    it("returns null if the arguments are not valid numbers", function() {
      assert.equal(sum.addTwoNumbers(4, "a"), null);
      assert.equal(sum.addTwoNumbers("a", "b"), null);
      assert.equal(sum.addTwoNumbers(null, "abcd"), null);
      assert.equal(sum.addTwoNumbers({"a": "aa"}, 1), null);
      assert.equal(sum.addTwoNumbers({"a": "b"}, {"c": "d"}), null);
      assert.equal(sum.addTwoNumbers(["a", "b"], ["c", "d"]), null);
    });

  });

  describe("addMultipleTypes", function() {

    it("calls addTwoNumbers if arguments are numbers", function() {
      let addTwoNumbersStub = sinon.stub(sum, "addTwoNumbers");
      addTwoNumbersStub.withArgs(4, 5).returns(9);

      assert.equal(sum.addMultipleTypes(4, 5), 9);

      sinon.assert.calledOnce(addTwoNumbersStub);
      addTwoNumbersStub.restore();
    });

    it("returns concatenated string if arguments are strings", function() {
      assert.equal(sum.addMultipleTypes("a", "b"), "ab");
      assert.equal(sum.addMultipleTypes("abcd", "defg"), "abcddefg");
      assert.equal(sum.addMultipleTypes("", "ab"), "ab");
      assert.equal(sum.addMultipleTypes(" ", "ab"), " ab");
      assert.equal(sum.addMultipleTypes("ab", ""), "ab");
    });

    it("returns merged array if arguments are arrays", function() {
      assert.equal(JSON.stringify(sum.addMultipleTypes([1], [2])), JSON.stringify([1, 2]));
      assert.equal(JSON.stringify(sum.addMultipleTypes([1, 2, 3, 4], [5, 6, 7, 8])), JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]));
      assert.equal(JSON.stringify(sum.addMultipleTypes([], [1, 2])), JSON.stringify([1, 2]));
      assert.equal(JSON.stringify(sum.addMultipleTypes([1, 2], [])), JSON.stringify([1, 2]));
    });

    it("returns TYPE_MISMATCH_FOR_SUM if both arguments are of different types", function() {
      assert.equal(sum.addMultipleTypes(4, "5"), "TYPE_MISMATCH_FOR_SUM");
      assert.equal(sum.addMultipleTypes("abcd", [1, 2]), "TYPE_MISMATCH_FOR_SUM");
      assert.equal(sum.addMultipleTypes([1, 2], 5), "TYPE_MISMATCH_FOR_SUM");
    });

    it("returns NOT_IMPLEMENTED_FOR_TYPE if sum not implemented for argument types", function() {
      var TempFunc = function() {};
      assert.equal(sum.addMultipleTypes({1: 2}, {3: 4}), "NOT_IMPLEMENTED_FOR_TYPE");
      assert.equal(sum.addMultipleTypes(undefined, undefined), "NOT_IMPLEMENTED_FOR_TYPE");
      assert.equal(sum.addMultipleTypes(null, null), "NOT_IMPLEMENTED_FOR_TYPE");
      assert.equal(sum.addMultipleTypes(new TempFunc(), new TempFunc()), "NOT_IMPLEMENTED_FOR_TYPE");
    });

  });

});
