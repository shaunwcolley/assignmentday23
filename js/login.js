let registerEmailTextBox = document.getElementsById("registerEmailTextBox")
let registerPasswordTextBox = document.getElementsById("registerPasswordTextBox")
let registerBtn = document.getElementById("registerBtn")


let loginEmailTextBox = document.getElementById("loginEmailTextBox")
let loginPasswordTextBox = document.getElementById('loginPasswordTextBox')
let loginBtn = document.getElementById("loginBtn")

registerBtn.addEventListener('click', function () {
  let email = registerEmailTextBox.value
  let password = registerPasswordTextBox.value
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(response){
    console.log(response)
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  })
})

loginBtn.addEventListener('click', function() {
  let email = loginEmailTextBox.value
  let password = loginPasswordTextBox.value

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(response){
    window.location = "grocery-page.html"
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  })
})
