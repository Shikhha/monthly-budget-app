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

  var calculate = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(current) {
      sum += current.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0,
      budget: 0,
      percentage: -1
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
    },

    calculateBudget: function() {
      calculate("inc");
      calculate("exp");
      data.totals.budget = data.totals.inc - data.totals.exp;
      data.totals.percentage = Math.round(
        (data.totals.exp / data.totals.inc) * 100
      );
    },

    getBudget: function() {
      return {
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        Budget: data.totals.budget,
        percentage: data.totals.percentage
      };
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
    expensesContainer: ".expenses__list",
    budgetValue: ".budget__value",
    budgetIncome: ".budget__income--value",
    budgetExpense: ".budget__expenses--value",
    budgetPercentage: ".budget__expenses--percentage"
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

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetValue).textContent = obj.Budget;
      document.querySelector(DOMstrings.budgetIncome).textContent =
        obj.totalInc;
      document.querySelector(DOMstrings.budgetExpense).textContent =
        obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.budgetPercentage).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.budgetPercentage).textContent = "--";
      }
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

  var updateBudget = function() {
    //calculate budget
    budgetCtrl.calculateBudget();
    // get new budget
    var budget = budgetCtrl.getBudget();
    //update the UI
    UIController.displayBudget(budget);
  };
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
      //5. calculate and display the budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log("the application has started");
      UICtrl.displayBudget({
        totalInc: 0,
        totalExp: 0,
        Budget: 0,
        percentage: -1
      });
      setUpEventListeneres();
    }
  };
})(budgetController, UIController);

controller.init();
