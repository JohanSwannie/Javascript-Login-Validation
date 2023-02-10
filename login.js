class LoginPanel {
  constructor(loginForm, inputFields) {
    this.loginForm = loginForm;
    this.inputFields = inputFields;
    this.validationsOnSubmit();
  }

  validationsOnSubmit() {
    let self = this;

    this.loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      var errorCount = 0;
      self.inputFields.forEach((inputField) => {
        const input = document.querySelector(`#${inputField}`);
        if (self.validateInputFields(input) == false) {
          errorCount++;
        }
      });
      if (errorCount == 0) {
        localStorage.setItem("auth", 1);
        this.loginForm.submit();
      }
    });
  }

  validateInputFields(inputField) {
    if (inputField.value.trim() === "") {
      this.setStatus(
        inputField,
        `${inputField.previousElementSibling.innerHTML} can not be blank`,
        "failed"
      );
      return false;
    } else {
      if (inputField.type == "password") {
        if (inputField.value.length < 8) {
          this.setStatus(
            inputField,
            `${inputField.previousElementSibling.innerHTML} must be at least 8 characters`,
            "failed"
          );
          return false;
        } else {
          this.setStatus(inputField, null, "successful");
          return true;
        }
      } else {
        this.setStatus(inputField, null, "successful");
        return true;
      }
    }
  }

  setStatus(inputField, message, report) {
    const errorMessage =
      inputField.parentElement.querySelector(".error-message");

    if (report == "successful") {
      if (errorMessage) {
        errorMessage.innerHTML = "";
      }
      inputField.classList.remove("error");
    }

    if (report == "failed") {
      errorMessage.innerHTML = message;
      inputField.classList.add("error");
    }
  }
}

document.getElementById("username").focus();

const loginForm = document.querySelector(".loginForm");

if (loginForm) {
  const fields = ["username", "email", "password"];
  const validator = new LoginPanel(loginForm, fields);
}
