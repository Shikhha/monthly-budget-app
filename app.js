//BUDGET CONTROLLER
var budgetController = (function() {})();

//UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstring: function() {
      return DOMstrings;
    }
  };
})();

//GLOABL CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  //function inside controlle
  var getDOMstring = UICtrl.getDOMstring();
  var ctrlAddItem = function() {
    var input = UICtrl.getInput();
    console.log(input);
  };

  //function inside controller
  document
    .querySelector(getDOMstring.inputBtn)
    .addEventListener("click", ctrlAddItem);

  // function inside controller
  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
