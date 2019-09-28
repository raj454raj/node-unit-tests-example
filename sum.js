
const getConfig = function(environment) {
  return {
    howToAdd: environment === "production" ? "multipleTypes" : "justNumbers"
  };
};

const SumThings = function() {
  const addTwoNumbers = function(a, b) {
    if (typeof a !== "number" || typeof b !== "number") return null;
    return a + b;
  };

  const addMultipleTypes = function(a, b) {
    let typeofa = typeof a;
    let typeofb = typeof b;

    if (typeofa !== typeofb) {
      return "TYPE_MISMATCH_FOR_SUM";
    } else if (typeofa === "number") {
      return this.addTwoNumbers(a, b);
    } else if (typeofa === "string" || (Array.isArray(a) && Array.isArray(b))) {
      return a.concat(b);
    } else {
      return "NOT_IMPLEMENTED_FOR_TYPE";
    }
  };

  const sumWrapper = function(thisConfig, a, b) {
    if (thisConfig.howToAdd === "multipleTypes") {
      return this.addMultipleTypes(a, b);
    } else {
      return this.addTwoNumbers(a, b);
    }
  };

  return {addTwoNumbers, addMultipleTypes, sumWrapper};
}

const main = function() {
  let environment = process.argv[2];
  let thisConfig = getConfig(environment);

  let sumThings = new SumThings();

  console.log(sumThings.sumWrapper(thisConfig, 4, 5));
  console.log(sumThings.sumWrapper(thisConfig, "a", "bc"));
  console.log(sumThings.sumWrapper(thisConfig, [1, 2], [3, 4]));
  console.log(sumThings.sumWrapper(thisConfig, {1: 2}, {3: 4}));
};

// main();

module.exports.SumThings = SumThings;
