window.onload = ()=>{
    signupRequest();
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

        ajax.onreadystatechange = ()=>{
            if(ajax.readyState == 4){
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

const showMessage = (message,color,iconClass)=>{
    $(".toast").toast('show');
    $(".toast").addClass("animate__animated animate__slideInRight");
    $("i",".toast-title").removeClass(iconClass)
    $("i",".toast-title").addClass(iconClass)
    $(".toast-body").html(message);
    $(".toast-title").css({"color":color});
}