//BUDGET CONTROLLER

var budgetController = (function() {
  var Income = function(ID, description, value) {
    this.ID = ID;
    this.description = description;
    this.value = value;
  };

  var Expense = function(ID, description, value) {
    this.ID = ID;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };

  return {
    addItem: function(type, desc, val) {
      var ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].ID + 1;
      } else {
        ID = 0;
      }
      var newItem;
      if (type === "inc") {
        newItem = new Income(ID, desc, val);
      } else {
        newItem = new Expense(ID, desc, val);
      }
      data.allItems[type].push(newItem);
      console.log(data);
      return newItem;
    }
  };
})();

//UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn"
  };
  return {
    getInputValues: function() {
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
  var setUpEventListeneres = function() {
    var DOM = UIController.getDOMstring();
    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  var ctrlAddItem = function() {
    var input, newItem;
    //1. get the input values
    input = UICtrl.getInputValues();
    //2. Add item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    //3. add the item to the ui

    //4. calculate the budget
    //5. display the budget
  };

  return {
    init: function() {
      console.log("the application has started");
      setUpEventListeneres();
    }
  };
})(budgetController, UIController);

controller.init();
