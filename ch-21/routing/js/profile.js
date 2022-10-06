window.onload = ()=>{
    verifyToken();
}

const verifyToken = ()=>{
    const data = location.href.split("?")[1];
    const ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/api/verifyToken", true);
    ajax.send(data);

    // get response
    ajax.onload = ()=>{
        console.log(ajax.responseText);
    }

}

