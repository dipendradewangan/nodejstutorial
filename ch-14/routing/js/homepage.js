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
                console.log(data);
                
            }
        }
    }
}