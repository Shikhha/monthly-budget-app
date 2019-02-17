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
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list"
  };
  return {
    getInputValues: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    getDOMstring: function() {
      return DOMstrings;
    },

    addItem: function(object, type) {
      var html, newhtml, element;
      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;

        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      newhtml = html.replace("%id%", object.ID);
      newhtml = newhtml.replace("%description%", object.description);
      newhtml = newhtml.replace("%value%", object.value);

      document.querySelector(element).insertAdjacentHTML("beforeend", newhtml);
    },
    clearfields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(current, index, Array) {
        current.value = "";
      });
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

  var updateBudget = function() {};
  var ctrlAddItem = function() {
    var input, newItem;
    //1. get the input values
    input = UICtrl.getInputValues();
    if (input.description != "" && !isNaN(input.value) && input.value > 0) {
      //2. Add item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      //3. add the item to the ui
      UICtrl.addItem(newItem, input.type);
      //4. clear fields
      UICtrl.clearfields();
      //5. calculate the budget
      //6. display the budget
    }
  };

  return {
    init: function() {
      console.log("the application has started");
      setUpEventListeneres();
    }
  };
})(budgetController, UIController);

controller.init();
