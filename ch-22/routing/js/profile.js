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
        }
        else{
            localStorage.removeItem("__token");
            localStorage.removeItem("__secretId");
            window.location = "http://localhost:8080";
        }
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


