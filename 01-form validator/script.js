const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const password2 = document.getElementById("password2");

// show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  console.log(small);
  small.innerText = message;
  console.log(small);
}

// show success error message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// check if email is valid
function checkEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Please enter a valid ${getFieldName(input)}`);
  }
}
//check if password match
checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
  }
  showError(input2, `${getFieldName(input1)} do not match`);
};

// check if inputs are not empty
checkRequired = (...inputArray) => {
  inputArray.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      console.log(input.id);
    } else {
      showSuccess(input);
    }
  });
};

// get fieldname
getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

checkLength = (input, min, max) => {
  if (input.value.trim() < min) {
    showError(input, `${getFieldName(input)} must be greater than ${min}`);
  } else if (input.value.trim() > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`);
  }
};

// event listener
form.addEventListener("submit", function(e) {
  e.preventDefault();

  checkRequired(username, email, password, password2);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
