// script for pulling things out of the inventory tracker
function compare(a, b) {
  if (a.product < b.product) {
    return -1;
  } else if (a.product > b.product) {
    return 1;
  } else {
    return 0;
  }
};

function updatedInventory() {
  var x = '<div class="col-sm-12"><h1>Inventory</h1></div>';
  var i, j;
  var modals = '';

  Inventory.items.sort(compare);

  for (i in Inventory.items) {
    x += `<div class="col-sm-3">`;
    x += `<div class="card">`;
    x += `<button data-target="#${Inventory.items[i].id}" data-toggle="modal" style="padding:6px;" class="btn btn-default btn-sm pull-left">Edit Item</button>`;
    x += `<button value=${Inventory.items[i].id} style="padding:6px;" class="remove btn btn-primary btn-xs pull-right">x</button>`;
    x += `<div class="clearfix"></div>`;
    x += `<h2>${Inventory.items[i].product}</h2>`;
    x += `<div><img style="height: 100px;" src="${Inventory.items[i].image}" alt="${Inventory.items[i].product}" /></div>`;
    x += `<h3>Description:</h3><p>${Inventory.items[i].description}</p>`;
    x += `<h3>Quantity: </h3><p> ${Inventory.items[i].amount}</p>`;
    x += `<h3>Location</h3><p>${Inventory.items[i].location}</p>`;
    x += `<h4>Check out Status</h4><p>`;
    if (Inventory.items[i].checkoutStatus === true) {
      x += `Item is checked out.`;
      x += `</p>`;
      x += `<button value=${Inventory.items[i].id} class="check btn btn-primary btn-block">Check in Item</button>`;
    } else {
      x += `Item is <strong>not</strong> checked out.`;
      x += `</p>`;
      x += `<button value=${Inventory.items[i].id} class="check btn btn-primary btn-block">Check out Item</button>`;
    };

    x += `</div></div>`;

    modals += `<!-- Modal for Editing -->
      <div class="modal fade" id="${Inventory.items[i].id}" tabindex="-1" role="dialog" aria-labelledby="${Inventory.items[i].id}Label">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h2 class="modal-title" id="${Inventory.items[i].id}Label">Edit ${Inventory.items[i].product} Item</h2>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-12">
                  <form id="editItemForm" method="post">
                    <label for="editItemName">Item name</label>
                    <input class="form-control" type="text" id="editItemName" value="${Inventory.items[i].product}" required=""/>

                    <label for="editItemBrand">Item Brand</label>
                    <input class="form-control" type="text" id="editItemBrand" value="${Inventory.items[i].brand}" required="" />

                    <label for="editItemAmount">Amount</label>
                    <input class="form-control" type="number" id="editItemAmount" value="${Inventory.items[i].amount}" required=""/>

                    <label for="editItemImage">URL of Image</label>
                    <input class="form-control" type="text" id="editItemImage" value="${Inventory.items[i].image}" required=""/>

                    <label for="editItemStatusDescription">Description of Inventory Item</label>
                    <textarea class="form-control" id="editItemStatusDescription" rows="3" required="">${Inventory.items[i].description}</textarea>

                    <label for="editItemLocation">Location</label>
                    <input class="form-control" type="text" id="editItemLocation" value="${Inventory.items[i].location}" required=""/>

                    <div>
                      <p>Check out status</p>
                      <label class="radio-inline" for="true">
                        <input  type="radio" name="editItemStatus" value="true" />
                        Yes
                      </label>

                      <label class="radio-inline" for="false">
                        <input  type="radio" name="editItemStatus" value="false" checked="" />
                        No
                      </label>
                    </div>

                    <br />
                    <button data-dismiss="modal" type="button" value="${Inventory.items[i].id}" class="saveItemEdits btn btn-primary pull-right">Save changes</button>
                  </form>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="modal-footer">


            </div>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("inventoryDrop").innerHTML = x;
  document.getElementById("modalDrop").innerHTML = modals;

  var removeBtns = document.querySelectorAll('.remove');
  removeBtns.forEach(function(e) {
    e.addEventListener('click', removeItem);
  });

  var checkoutStatusBtns = document.querySelectorAll('.check');
  checkoutStatusBtns.forEach(function(e) {
    e.addEventListener('click', toggleCheckoutStatus);
  });

  var saveEditsBtns = document.querySelectorAll('.saveItemEdits');
  saveEditsBtns.forEach(function(e) {
    e.addEventListener('click', saveChanges);
  });

}

// next function removes inventory items
function removeItem() {
  let currentItemId = this.value;
  let currentIndex = Inventory.items.findIndex(x => x.id == currentItemId);
  Inventory.items.splice(currentIndex, 1);
  updatedInventory();
}

// next function toggles the checkout status of an item
function toggleCheckoutStatus() {
  let currentItemId = this.value;
  let currentIndex = Inventory.items.findIndex(x => x.id == currentItemId);
  if (Inventory.items[currentIndex].checkoutStatus === true) {
    Inventory.items[currentIndex].checkoutStatus = false;
  } else {
    Inventory.items[currentIndex].checkoutStatus = true;
  };
  updatedInventory();
}


// helper functions
// gets a value from an input
function getInputValue(id) {
  return document.getElementById(id).value;
}

function saveChanges() {
  let currentItemId = this.value;
  let currentIndex = Inventory.items.findIndex(x => x.id == currentItemId);
  console.log(`currentItemId = ${currentItemId}`)
  console.log(`current Index happens to be = ${currentIndex}`);

  Inventory.items[currentIndex].product = getInputValue('editItemName');
  Inventory.items[currentIndex].brand = getInputValue('editItemBrand');

  Inventory.items[currentIndex].amount = getInputValue('editItemAmount');
  Inventory.items[currentIndex].amount = parseInt(Inventory.items[currentIndex].amount, 10)

  Inventory.items[currentIndex].image = getInputValue('editItemImage');
  Inventory.items[currentIndex].description = getInputValue('editItemStatusDescription');
  Inventory.items[currentIndex].location = getInputValue('editItemLocation');

  	updatedInventory();
// let currentModal =
      $('#' + (Inventory.items[currentIndex].id).toString() +'').modal('hide');
}

updatedInventory();



      // Beginning of script for adding things to the inventory tracker

  document.getElementById('addNewItem').addEventListener('submit', submitItem);

function submitItem(e) {
  e.preventDefault();

  let itemBrand = getInputValue('itemBrand');
  let itemName = getInputValue('itemName');
  let itemAmount = getInputValue('itemAmount');
  itemAmount = parseInt(itemAmount, 10);

  let itemImage = getInputValue('itemImage');
  let itemDescription = getInputValue('description');
  let itemLocation = getInputValue('itemLocation');
  let itemCheckoutStatus = document.getElementsByName('status');

  for (var status = 0; status < itemCheckoutStatus.length; status++) {
    if (itemCheckoutStatus[status].checked) {
      itemCheckoutStatus = itemCheckoutStatus[status].value;
      if (itemCheckoutStatus === "true") {
        itemCheckoutStatus = true;
      } else {
        itemCheckoutStatus = false;
      }
    }
  }

  let itemId = getInputValue('itemId');

  addItem(itemBrand, itemName, itemAmount, itemImage, itemDescription, itemLocation, itemCheckoutStatus, itemId);

  document.getElementById('addNewItem').reset();
}

function addItem(itemBrand, itemName, itemAmount, itemImage, itemDescription, itemLocation, itemCheckoutStatus, itemId) {
  let newItem = {
    brand: itemBrand,
    product: itemName,
    amount: itemAmount,
    image: itemImage,
    description: itemDescription,
    location: itemLocation,
    checkoutStatus: itemCheckoutStatus,
    id: itemId
  };

  Inventory.items.push(newItem);

  updatedInventory();
}
