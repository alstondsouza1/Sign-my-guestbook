// Event listeners
document
  .getElementById("mailing")
  .addEventListener("change", toggleEmailFormat);
document.getElementById("meet").addEventListener("change", toggleOtherTextbox);

function toggleEmailFormat() {
  const isMailingListChecked = document.getElementById("mailing").checked;
  const emailFormatOptions = document.querySelectorAll(
    "input[name='email_format']"
  );

  emailFormatOptions.forEach((option) => {
    option.parentElement.style.display = isMailingListChecked
      ? "inline-block"
      : "none";
  });
}

// Function to toggle other
function toggleOtherTextbox() {
  const meetSelection = document.getElementById("meet").value;
  const otherTextbox = document.getElementById("other");

  otherTextbox.style.display = meetSelection === "other" ? "block" : "none";
}

// validate submission
document.getElementById("contact").onsubmit = function () {
  clearErrors();
  let isValid = true;

  // validate first name
  let fname = document.getElementById("fname").value;
  if (fname === "") {
    let errSpan = document.getElementById("err-fname");
    errSpan.style.display = "inline";
    isValid = false;
  }

  // validate last name
  let lname = document.getElementById("lname").value;
  if (lname === "") {
    let errSpan = document.getElementById("err-lname");
    errSpan.style.display = "inline";
    isValid = false;
  }

  //validate email
  let isMailingListChecked = document.getElementById("mailing").checked;
  let email = document.getElementById("email").value;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errSpan = document.getElementById("err-email");

  if (isMailingListChecked) {
    if (email === "") {
      errSpan.textContent = "Field is required";
      errSpan.style.display = "inline";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      errSpan.textContent = "Invalid email format";
      errSpan.style.display = "inline";
      isValid = false;
    }
  } else if (email !== "" && !emailPattern.test(email)) {
    errSpan.textContent = "Invalid email format";
    errSpan.style.display = "inline";
    isValid = false;
  }

  // validate linkin
  let linkedIn = document.getElementById("linkin").value;
  let errLinkedIn = document.getElementById("err-linkin");

  if (linkedIn !== "" && !linkedIn.startsWith("https://linkedin.com/in/")) {
    errLinkedIn.textContent =
      "LinkedIn  URL must start with 'https://linkedin.com/in/'";
    errLinkedIn.style.display = "inline";
    isValid = false;
  }

  // validate how we met
  let meet = document.getElementById("meet").value;
  let errMeet = document.getElementById("err-meet");

  if (meet === "select") {
    errMeet.style.display = "inline";
    isValid = false;
  }

  if (isValid) {
    window.location.href = "success.html";
  }

  return isValid;
};

//clearing all errors from page
function clearErrors() {
  let errors = document.getElementsByClassName("err");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}

toggleEmailFormat();
toggleOtherTextbox();
