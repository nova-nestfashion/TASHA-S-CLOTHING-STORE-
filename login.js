window.login = function(){

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;


    if(
        username === "tashaadmin" &&
        password === "Tasha2026"
    ){

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        window.location.href = "admin.html";


    } else {

        alert("Wrong username or password");

    }

}