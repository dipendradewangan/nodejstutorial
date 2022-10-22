// requesting login modal
$(document).ready(()=>{
    $("#login-request-modal").click((event)=>{
        event.preventDefault();
        $("#signup-modal").modal("hide");
        $("#login-modal").modal("show");
    })
});


// requesting signup modal
$(document).ready(()=>{
    $("#signup-request-modal").click((event)=>{
        event.preventDefault();
        $("#login-modal").modal("hide");
        $("#signup-modal").modal("show");
    })
})


// signup request

$(document).ready(()=>{
    $("#signup-form").submit((event)=>{
        event.preventDefault();
        $.ajax({
            type : "POST",
            url : "api/signup",
            data : new FormData(event.target),
            processData : false,
            contentType : false,
            success : (response)=>{
                console.log(response);
            }
        });
    });
});