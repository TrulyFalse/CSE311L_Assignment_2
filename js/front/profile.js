
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



// as soon as the page loads
window.onload = function(){
    retrieve_profile();
};

function retrieve_profile(){
    // retrieving profile info
    profile = JSON.parse(localStorage.getItem("profile"));
    console.log(profile);
    console.log(profile.email);
    fetch("http://localhost:3000/api/profile?" + new URLSearchParams({email: profile.email}),
    {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => {
            console.log("res:", res.result);
            if (res.result) {
                document.getElementById("fname").value = res.result.first_name;
                document.getElementById("lname").value = res.result.last_name;
                document.getElementById("gender").value = res.result.gender;
                document.getElementById("dob").value = res.result.dob.split('T')[0];
                document.getElementById("email").value = res.result.email;
            }
        });
}

function edit_fields(){
    disabled_value = document.getElementById("fname").getAttribute("disabled");
    
    if(disabled_value == null){
        document.getElementById("pfp").setAttribute("disabled", "");
        document.getElementById("fname").setAttribute("disabled", "");
        document.getElementById("lname").setAttribute("disabled", "");
        document.getElementById("gender").setAttribute("disabled", "");
        document.getElementById("dob").setAttribute("disabled", "");
        document.getElementById("email").setAttribute("disabled", "");

        document.getElementById("submit_btn").setAttribute("disabled", "");
        document.getElementById("submit_btn").setAttribute("class", "disabled_button");

        document.getElementById("edit_btn").innerHTML = "Enable Edit";
        document.getElementById("edit_btn").removeAttribute("class");
    } else {
        document.getElementById("pfp").removeAttribute("disabled");
        document.getElementById("fname").removeAttribute("disabled");
        document.getElementById("lname").removeAttribute("disabled");
        document.getElementById("gender").removeAttribute("disabled");
        document.getElementById("dob").removeAttribute("disabled");
        document.getElementById("email").removeAttribute("disabled");

        document.getElementById("submit_btn").removeAttribute("disabled");
        document.getElementById("submit_btn").setAttribute("class", "button");

        document.getElementById("edit_btn").setAttribute("class", "toggled");
        document.getElementById("edit_btn").innerHTML = "Disable Edit";
    }
}


let profile_form = document.getElementById("profile_form");
profile_form.addEventListener("submit", function(event){
    event.preventDefault();
    validate_update();
});

// input validation function
function validate_update(){
    // the commented-out code line just below this comment is not suitable for validation though it is more efficient, because all of the functions will not execute after the first false is returned
    // let valid_submission = check_first_name() && check_last_name() && check_gender() && check_dob() && check_email() && check_password() && check_retyped_password();
    // suitable method:
    let valid_pfp = check_pfp();
    let valid_fname = check_first_name();
    let valid_lname = check_last_name();
    let valid_gender = check_gender();
    let valid_dob = check_dob();
    let valid_email = check_email();
    let valid_submission = valid_pfp && valid_fname && valid_lname && valid_gender && valid_dob && valid_email;
    
    if(valid_submission){
        //accept the input field values
        let profile_data = {
            first_name:     document.getElementById("fname").value,
            last_name:      document.getElementById("lname").value,
            gender:         document.getElementById("gender").value,
            dob:            document.getElementById("dob").value,
            email:          document.getElementById("email").value,
            old_email:      JSON.parse(localStorage.getItem("profile")).email,
            pfp:            document.querySelector('input[type=file]').files[0],
        };
        console.log("data", profile_data);

        fetch("http://localhost:3000/api/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile_data),
        })
            .then((res) => res.json())
            .then((res) => {
            console.log("res", res);
            if (res.result) {
                localStorage.setItem("profile", JSON.stringify(profile_data));
                alert("Profile updated successfully");
            } else {
                alert("Profile not updated: " + res.error.sqlMessage);
            }
            }).then(() => {
                retrieve_profile();
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
    else if(pfp.match(/.*\.(PNG|JPG|JPEG)$/g)){
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



