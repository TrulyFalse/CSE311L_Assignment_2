
// DRY code
function hide_element(element_id){
    document.getElementById(element_id).setAttribute("hidden", "true");
}
function unhide_element(element_id){
    document.getElementById(element_id).removeAttribute("hidden");
}
function highlight_field(field_id, is_correct){
        document.getElementById(field_id).setAttribute("class", (is_correct ? "success" : "error"));
}


let login_form = document.getElementById("login_form");
console.log("it's here.");
login_form.addEventListener("submit", function(event){
    event.preventDefault();
    validate_login();
});


// input validation function
function validate_login(){

    // the commented-out code line just below this comment is not suitable for validation though it is more efficient, because all of the functions will not execute after the first false is returned
    // let valid_submission = check_email() && check_password();
    // suitable method:
    let valid_email = check_email();
    let valid_password = check_password();

    let valid_submission = valid_email && valid_password;

    if(valid_submission){    
        //accept the input field values
        let login_data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };
        console.log("data", login_data);

        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login_data),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("res:", res.result);
                if (res.result && res.result.length > 0) {
                    // saving the logged profile info in browser under the key named "profile" to retrive it in the profile page
                    localStorage.setItem("profile", JSON.stringify(res.result[0]));

                    window.location.href = "profilePage.html";
                    alert("Logging in");
                } else {
                    alert("Login failed: Invalid email or password");
                }
            });
    }else{
        return false;
    }
}



function check_email(){
    let email = document.getElementById("email").value;

    let prompt = document.getElementById("email_prompt");
    if(email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        hide_element(prompt.id);
        highlight_field("email", true);
        return true;
    }
    else if(email == ""){
        prompt.innerHTML = "This field must be filled";
    }
    else{
        prompt.innerHTML = "Invalid email address"
    }
    unhide_element(prompt.id)
    highlight_field("email", false);
    return false;
}



function check_password(){
    let password = document.getElementById("password").value;

    let prompt = document.getElementById("password_prompt");
    prompt.innerHTML = ""; // clear up the innerHTML so that previous prompts are reset
    if(password == ""){
        unhide_element(prompt.id);
        highlight_field("password", false);
        prompt.innerHTML = "This field must be filled";
        return false;
    }
    
    
    let min_length_fulfilled = (password.length >= 5);
    let symbol_used = false;
    let number_used = false;
    let no_whitepaces = true;
  
    for(let char of password){
        let ascii_char_number = char.charCodeAt(0);
        if(char.match(/\s/)){ // checks for whitespace (password cannot have spaces)
            no_whitepaces = false;
        }
        else if(ascii_char_number >= 48 && ascii_char_number <= 57){
            number_used = true;
        }
        else if(
            (ascii_char_number >= 33 && ascii_char_number <= 47) ||
            (ascii_char_number >= 58 && ascii_char_number <= 64) ||
            (ascii_char_number >= 91 && ascii_char_number <= 96) ||
            (ascii_char_number >= 123 && ascii_char_number <= 126)){
            symbol_used = true;
        }
    }
  
    if(!min_length_fulfilled){
        prompt.innerHTML += "Password length must be at least 5\n";
    }
    if(!no_whitepaces){
        prompt.innerHTML += "Password cannot have whitespaces\n";
    }
    if(!symbol_used){
        prompt.innerHTML += "Password must have at least one symbol\n";
    }
    if(!number_used){
        prompt.innerHTML += "Password must have at least one number\n";
    }

    if (min_length_fulfilled && no_whitepaces && symbol_used && number_used){
        hide_element(prompt.id);
        highlight_field("password", true);
        return true;
    }
    else{
        unhide_element(prompt.id);
        highlight_field("password", false);
        return false;
    }
  }