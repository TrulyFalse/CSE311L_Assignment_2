
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


let registration_form = document.getElementById("registration_form");
registration_form.addEventListener("submit", function(event){
    event.preventDefault();
    validate_registration();
});

// input validation function
function validate_registration(){
    // the commented-out code line just below this comment is not suitable for validation though it is more efficient, because all of the functions will not execute after the first false is returned
    // let valid_submission = check_first_name() && check_last_name() && check_gender() && check_dob() && check_email() && check_password() && check_retyped_password();
    // suitable method:
    let valid_pfp = check_pfp();
    let valid_fname = check_first_name();
    let valid_lname = check_last_name();
    let valid_gender = check_gender();
    let valid_dob = check_dob();
    let valid_email = check_email();
    let valid_password = check_password();
    let valid_retyped_password = check_retyped_password();
    let valid_submission = valid_pfp && valid_fname && valid_lname && valid_gender && valid_dob && valid_email && valid_password && valid_retyped_password;
    
    if(valid_submission){
        //accept the input field values
        let profile_data = {
            first_name: document.getElementById("fname").value,
            last_name: document.getElementById("lname").value,
            gender: document.getElementById("gender").value,
            dob: document.getElementById("dob").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            pfp: document.querySelector('input[type=file]').files[0],
        };
        console.log("data", profile_data);

        fetch("http://localhost:3000/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile_data),
        })
            .then((res) => res.json())
            .then((res) => {
            console.log("res", res);
            if (res.result) {
                window.location.href = "loginPage.html";
                alert("Profile registered successfully");
            } else {
                alert("Profile not registered: " + res.error.sqlMessage);
            }
            });
    }else{
        return false;
    }
}


function check_pfp(){
    let pfp = document.getElementById("pfp").value;
    //console.log("filetype == BLOB:" + pfp instanceof blob);
    let prompt = document.getElementById("pfp_prompt");

    if(pfp == ""){
        prompt.innerHTML = "This field must be filled";
    }
    else if(pfp.match(/.*\.(PNG|JPG|JPEG|png|jpg|jpeg)$/g)){
        hide_element(prompt.id);
        highlight_field("pfp", true);
        return true;
    }else{
        prompt.innerHTML = "Only .png, .jpg and .jpeg files supported";
    }
    unhide_element(prompt.id);
    highlight_field("pfp", false);
    return false;
}


function check_first_name(){
    let first_name = document.getElementById("fname").value;
    console.log("first name = " + first_name);

    let prompt = document.getElementById("fname_prompt");
    if(first_name == ""){
        prompt.innerHTML = "This field must be filled";
    }
    else if(first_name.match("^.*[0-9].*$")){
        prompt.innerHTML = "Names cannot have numbers in them";
    }
    else{
        hide_element(prompt.id);
        highlight_field("fname", true);
        return true;
    }
    unhide_element(prompt.id);
    highlight_field("fname", false);
    return false;
}



function check_last_name(){
    let last_name = document.getElementById("lname").value;

    let prompt = document.getElementById("lname_prompt");
    if(last_name == ""){
        prompt.innerHTML = "This field must be filled";
    }
    else if(last_name.match("^.*[0-9].*$")){
        prompt.innerHTML = "Names cannot have numbers in them";
    }
    else{
        hide_element(prompt.id);
        highlight_field("lname", true);
        return true;
    }
    unhide_element(prompt.id);
    highlight_field("lname", false);
    return false;
}



function check_gender(){
    let gender = document.getElementById("gender").value;

    let prompt = document.getElementById("gender_prompt");
    if(gender == ""){
        unhide_element(prompt.id);
        prompt.innerHTML = "Must select a gender"
        highlight_field("gender", false);
        return false;
    }
    else{
        hide_element(prompt.id);
        highlight_field("gender", true);
        return true;
    }
}

function check_dob(){
    let dob = new Date(Date.parse(document.getElementById("dob").value));
    let age = new Date().getFullYear() - dob.getFullYear();

    let prompt = document.getElementById("dob_prompt");
    if(age < 10){
        prompt.innerHTML = "Must be above 10 years of age";
    }
    else if(dob == "Invalid Date"){
        prompt.innerHTML = "Must select a date of birth";
    }
    else{
        hide_element(prompt.id);
        highlight_field("dob", true);
        return true;
    }
    unhide_element(prompt.id);
    highlight_field("dob", false);
    return false;
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

  function check_retyped_password(){
    let retyped_password = document.getElementById("retype_password").value;
    let password = document.getElementById("password").value;

    let prompt = document.getElementById("retype_password_prompt");
    if(retyped_password == ""){
        prompt.innerHTML = "This field must be filled";
    }
    else if(retyped_password != password){
        prompt.innerHTML = "Retyped password did not match set password"
    }
    else{
        hide_element(prompt.id);
        highlight_field("retype_password", true);
        return true;
    }
    unhide_element(prompt.id);
    highlight_field("retype_password", false);
    return false;
  }