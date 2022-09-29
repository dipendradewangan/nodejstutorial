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
                let data = JSON.parse(ajax.responseText);
                console.log(data.message);
                if(data.message.insertedId){
                    $(".toast").toast('show');
                    $(".toast").addClass("animate__animated animate_faster animate_slideInRight");
                    $(".toast-body").html("Thank You ! signup success...");
                    $("#signup-form").trigger("reset");
                }
                else{
                    $(".toast").toast('show');
                    $(".toast").addClass("animate__animated animate_slideInRight");
                    $(".toast-body").html("Opps ! internal server error..");
                    $("#signup-form").trigger("reset");
                }

            }
        }
    }
}