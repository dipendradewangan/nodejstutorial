window.onload = () => {
    autoLogin();
    signupRequest();
    rememberMe();
    showUser();
}

const signupRequest = () => {
    const form = document.querySelector("#signup-form");

    form.onsubmit = (event) => {
        event.preventDefault();

        const formData = JSON.stringify({
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            mobile: document.querySelector("#mobile").value,
            password: document.querySelector("#password").value
        })

        let url = "http://localhost:8080/api/signup";
        const ajax = new XMLHttpRequest();
        ajax.open('POST', url, true);
        ajax.send(formData);

        ajax.onreadystatechange = () => {
            if (ajax.readyState == 2) {
                $(".loader").removeClass("d-none");
            }
        }

        ajax.onreadystatechange = () => {
            if (ajax.readyState == 4) {
                $(".loader").addClass("d-none");

                const data = JSON.parse(ajax.response);
                console.log(data.message);
                if (data.message.toLowerCase() == "match found !") {
                    showMessage("User already exist !", "red", "fa fa-exclamation-circle mr-1");
                } else {
                    $("#signup-form").trigger("reset");
                    showMessage("Signup success !", "green", "fa fa-check-circle mr-1");
                }

            }
        }
    }
}

const rememberMe = () => {
    const login_form = document.querySelector("#login-form");
    login_form.onsubmit = (event) => {
        event.preventDefault();
        const loginRememberCheckbox = document.querySelector("#remember-me");
        const login_email = document.querySelector("#login-email").value;
        const login_password = document.querySelector("#login-password").value;
        const user = JSON.stringify({
            username: login_email,
            password: login_password
        });
        if (loginRememberCheckbox.checked) {
            localStorage.setItem("user", user);
            loginRequest(user);
        } else {
            loginRequest(user);

        }
    }
}


const loginRequest = (user) => {
    const api_url = "http://localhost:8080/api/login"
    const ajax = new XMLHttpRequest();
    ajax.open("POST", api_url, true);
    ajax.send(user);

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 2) {
            $(".loader").removeClass("d-none");
        }
    }

    // get response 

    ajax.onload = () => {
        $(".loader").addClass("d-none");

        const response = JSON.parse(ajax.responseText);
        if (response.isLoged) {
            // login success
            const isVerified = verifyToken(response.token, api_url);
            if (isVerified) {
                // store verified token in localstorage
                localStorage.setItem("__token", response.token);
                localStorage.setItem("__secretId", response.secretId);
                window.location = "/profile?token="+response.token+"&secretId="+response.secretId;
            } else {
                showMessage("Authentication failed!", "red", "fa fa-exclamation-circle mr-1");
            }
        } else {
            showMessage(response.message, "red", "fa fa-exclamation-circle mr-1");
        }
    }


}

const verifyToken = (token, api_url) => {
    const jwt = JSON.parse(atob(token.split(".")[1]));
    if (jwt.iss == api_url) {
        // alert("Verified");
        return true;
    } else {
        // showMessage("Authentication failed!", "red", "fa fa-exclamation-cirle mr-1");
        return false;
    }
}

const showUser = () => {
    if (localStorage.getItem("user") != null) {
        const user = JSON.parse(localStorage.getItem("user"));
        const login_email = user.username;
        const login_password = user.password;
        document.querySelector("#login-email").value = login_email;
        document.querySelector("#login-password").value = login_password;
        document.querySelector("#remember-me").checked = true;
    }
}

const showMessage = (message, color, iconClass) => {
    $(".toast").toast('show');
    $(".toast").addClass("animate__animated animate__slideInRight");
    $("i", ".toast-title").removeClass(iconClass)
    $("i", ".toast-title").addClass(iconClass)
    $(".toast-body").html(message);
    $(".toast-title").css({
        "color": color
    });
}


const autoLogin = ()=>{
    if(localStorage.getItem("__token") != null && localStorage.getItem("__secretId") != null){
        const token = localStorage.getItem("__token");
        const secret_Id = localStorage.getItem("__secretId");
        window.location = "/profile?token="+token+"&secretId="+secret_Id;
    }
}