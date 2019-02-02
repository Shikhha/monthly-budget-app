//BUDGET CONTROLLER
var budgetController = (function() {})();

//UI CONTROLLER
var UIController = (function() {})();

//GLOABL CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  //function inside controlle
  var ctrlAddItem = function() {
    console.log("it works");
  };

  //function inside controller
  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  // function inside controller
  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
