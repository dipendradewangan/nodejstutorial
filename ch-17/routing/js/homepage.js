window.onload = ()=>{
    signupRequest();
    loginRequest();
    showUser();
}

const signupRequest = ()=>{
    const form = document.querySelector("#signup-form");

    form.onsubmit = (event)=>{
        event.preventDefault();
        
        const formData = JSON.stringify({
            name : document.querySelector("#name").value,
            email : document.querySelector("#email").value,
            mobile : document.querySelector("#mobile").value,
            password : document.querySelector("#password").value
        })
                
        let url = "http://localhost:8080/api/signup";
        const ajax = new XMLHttpRequest();
        ajax.open('POST', url,true);
        ajax.send(formData);

        // loader
        ajax.onreadystatechange = ()=>{
            if(ajax.readyState == 2){
                $(".loader").removeClass("d-none");
            }
        }
        
        // get response
        ajax.onreadystatechange = ()=>{
            if(ajax.readyState == 4){
                $(".loader").addClass("d-none");
                const data = JSON.parse(ajax.response);
                console.log(data.message);
                if(data.message.toLowerCase() == "match found !"){
                    showMessage("User already exist !","red","fa fa-exclamation-circle mr-1");
                }
                else{
                    $("#signup-form").trigger("reset");
                    showMessage("Signup success !","green","fa fa-check-circle mr-1");
                }
                
            }
        }
    }
}

const loginRequest = ()=>{
    const login_form = document.querySelector("#login-form");
    login_form.onsubmit = (event)=>{
        event.preventDefault();
        const checkBox = document.querySelector("#remember-me");
        const login_email = document.querySelector("#login-email").value;
        const login_password = document.querySelector("#login-password").value;
        const user = JSON.stringify({
            username : login_email,
            password : login_password
        });

        if(checkBox.checked){
            localStorage.setItem('user', user);
        }
        else{

        }
    }
}

const showUser = ()=>{
    if(localStorage.getItem('user') != null){
        const checkBox = document.querySelector("#remember-me");
        const login_email = document.querySelector("#login-email");
        const login_password = document.querySelector("#login-password");
        const user = JSON.parse(localStorage.getItem('user'));
        login_email.value = user.username;
        login_password.value = user.password;
        checkBox.checked = true;
    }
}

const showMessage = (message,color,iconClass)=>{
    $(".toast").toast('show');
    $(".toast").addClass("animate__animated animate__slideInRight");
    $("i",".toast-title").removeClass(iconClass)
    $("i",".toast-title").addClass(iconClass)
    $(".toast-body").html(message);
    $(".toast-title").css({"color":color});
}