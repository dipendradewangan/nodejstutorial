window.onload = ()=>{
    verifyToken();
    logout();
}

const verifyToken = ()=>{
    const data = location.href.split("?")[1];
    const ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/api/verifyToken", true);
    ajax.send(data);

    // get response
    ajax.onload = ()=>{
        const response = JSON.parse(ajax.responseText);
        console.log(response);
        if(response.isVerified){
            $(".loader").addClass("d-none");
            $(".profile-page").removeClass("d-none");
            const user = getUserInfo();
            console.log(user);
            if(user.emailVarified){
                // email already verified
            }
            else{
                
                const reciept = JSON.stringify({
                    email : user.email,
                    subject : "Nodewap email verification !",
                    message : "To complete your profile verification, we just need need to verify your email address",
                    token : localStorage.getItem("__token")
                });

                sendEmailVerification(reciept);
            }
        }
        else{
            localStorage.removeItem("__token");
            localStorage.removeItem("__secretId");
            window.location = "http://localhost:8080";
        }
    }

}

const getUserInfo = ()=>{
    const token = localStorage.getItem("__token");
    const user = JSON.parse(atob(token.split(".")[1]));
    return user.data;
}

const sendEmailVerification = (reciept)=>{
    const ajax = new XMLHttpRequest();
    ajax.open('POST','http://localhost:8080/api/sendmail', true);
    ajax.send(reciept);

    ajax.onload = ()=>{
        console.log(ajax.response);
    }
}

const logout = ()=>{
    const logout_btn = document.querySelector(".logout-btn");
    logout_btn.onclick = ()=>{

        // remove token and secret id from localstorage
        localStorage.removeItem("__token");
        localStorage.removeItem("__secretId");

        // redirect into homepage
        window.location = "http://localhost:8080";
    }
}

