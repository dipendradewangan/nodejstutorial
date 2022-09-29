window.onload = ()=>{
    signupRequest();
};

const signupRequest = ()=>{
    const signup_form = document.querySelector("#signup-form");
    signup_form.onsubmit = (event)=>{
        event.preventDefault();

        // ajax request 

        const formData = JSON.stringify({
            name : document.querySelector("#name"),
            email : document.querySelector("#email"),
            mobile : document.querySelector("#mobile"),
            password : document.querySelector("#password")
        });

        const ajax = new XMLHttpRequest();

        
        let url = "http://localhost:8080/api/signup";
        ajax.open('POST', url, true);
        ajax.send(formData);

        ajax.onreadystatechange =()=>{
            if(ajax.readyState == 4){
                console.log(ajax.responseText);
            }
        }
    }
};