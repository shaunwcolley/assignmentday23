let groceryDisplayUL = document.getElementById("groceryDisplayUL")
let categoryTextBox = document.getElementById("categoryTextBox")
let addBtn = document.getElementById("addBtn")
let viewAllBtn = document.getElementById("viewAllBtn")
let menuBar = document.getElementById("menuBar")

let database = firebase.database()
let categories = []
let categoriesRef = database.ref("categories")

addBtn.addEventListener('click', function(){
  let categoryInput = categoryTextBox.value
  let categoryRef = categoriesRef.push({
    categoryName: categoryInput
  })
  displayCategories()
})

viewAllBtn.addEventListener('click', function(){
  displayCategories()
})

database.ref("categories")
.on("child_added", function(snapshot){
  categories.push({key: snapshot.key, value: snapshot.val()})
})
database.ref("categories")
.on("child_removed", function(snapshot){
  categories = categories.filter(function(category){
    return category.key != snapshot.key
  })
  displayCategories()
})

function displayCategories() {
  let categoryLIItems = categories.map(function(category){
    if(typeof Object.values(category.value.items) === 'undefined') {
      return `<li class="categoryDisplay">
                <div class="storeDiv">
                  <div class="storeHeader">
                    <h4>${category.value.categoryName}</h4>
                  </div>
                  <div>
                    <button onclick="deleteCategory('${category.key}')">Delete</button>
                  </div>
                </div>
                <div class="addItems">
                    <input class="groceryItemTextBox" type="text" placeholder="Grocery Item"/>
                    <input type="hidden" value="${category.key}"/>
                    <button onclick="addItem(this)" class="addItemBtn">Add</button>
                </div>
                <ul class="groceryItemUl">
                <ul>
              </li>`
    }else{
      let items = Object.values(category.value.items)
      let groceryItems = []
        for(let i = 0; i < items.length; i++) {
          let item = items[i].item
          let liItem =`<li> ${item}
                    </li>`
          groceryItems.push(liItem)
        }
      return `<li class="categoryDisplay">
                <div class="storeDiv">
                  <div class="storeHeader">
                    <h4>${category.value.categoryName}</h4>
                  </div>
                  <div>
                    <button onclick="deleteCategory('${category.key}')">Delete</button>
                  </div>
                </div>
                <div class="addItems">
                    <input class="groceryItemTextBox" type="text" placeholder="Grocery Item"/>
                    <input type="hidden" value="${category.key}"/>
                    <button onclick="addItem(this)" class="addItemBtn">Add</button>
                </div>
                <ul class="groceryItemUl">
                ${groceryItems.join('')}
                <ul>
              </li>`
      }
    })


  if(menuBar.children.length > 3){
    groceryDisplayUL.innerHTML = categoryLIItems.join('')
  }else{
    menuBar.insertAdjacentHTML('beforeend', `<div><button id="hideBtn">Hide All Stores</button></div>`)
    let hideBtn = document.getElementById("hideBtn")
    hideCategories(hideBtn)
    groceryDisplayUL.innerHTML = categoryLIItems.join('')
  }
}

function addItem(btn){
  let categoryKey = btn.previousElementSibling.value
  let item = btn.previousElementSibling.previousElementSibling.value
  let categoryRef = categoriesRef.child(categoryKey)
  let itemsRef = categoryRef.child("items")
  itemsRef.push({
     item: item
   })
}

function hideCategories(button) {
  button.addEventListener('click', function(){
    menuBar.children[3].remove()
    groceryDisplayUL.innerHTML = ``
  })
}

function deleteCategory(key) {
  database.ref("categories").child(key).remove()
}
