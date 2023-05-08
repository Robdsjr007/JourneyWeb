const loginForm = document.getElementById("login-usuario-form");
const cadForm = document.getElementById("cad-usuario-form");
const modal = document.getElementsByClassName("modal");
const msgAlert = document.getElementById("msgAlert");
const msgAlertErroLogin = document.getElementById("msgAlertErroLogin");
const msgAlertErroCad = document.getElementById("msgAlertErroCad");
const cadModal = document.getElementById("demo-modalcad");
const loginModal = document.getElementById("demo-modallogin");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (document.getElementById("email").value === "") {
        msgAlertErroLogin.innerHTML = "<p>Erro: Necessário preencher o campo E-mail!</p>";
    } else if (document.getElementById("senha").value === "") {
        msgAlertErroLogin.innerHTML = "<p>Erro: Necessário preencher o campo senha!</p>";
    } else {
        const dadosForm = new FormData(loginForm);

        const dados = await fetch("validar.php", {
            method: 'POST',
            body: dadosForm
        });

        const resposta = await dados.json();

        if(resposta['erro']){
            msgAlertErroLogin.innerHTML = resposta['msg']
        }else{
            document.getElementById("dados-usuario").innerHTML = "Bem vindo " + resposta['dados'].nome + "<br><a href='sair.php'>Sair</a><br>";
            loginForm.reset();
            modal.style.display = "none";
        }
    }
});

cadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (document.getElementById("cadnome").value === "") {
        msgAlertErroCad.innerHTML = "<p>Erro: Necessário preencher o campo usuário!</p>";
    } else if (document.getElementById("cademail").value === "") {
            msgAlertErroCad.innerHTML = "<p>Erro: Necessário preencher o campo Email!</p>";
    } else if (document.getElementById("cadsenha").value === "") {
        msgAlertErroCad.innerHTML = "<p>Erro: Necessário preencher o campo senha!</p>";
    } else {
    const dadosForm = new FormData(cadForm);

    const dados = await fetch("cadastrar.php", {
        method: 'POST',
        body: dadosForm 
    });

    const resposta = await dados.json();

    //console.log(resposta);

    if(resposta['erro']){
        msgAlertErroCad.innerHTML = resposta['msg'];
    }else{
        alert('Você foi cadastrado')
        cadForm.reset();
        cadModal.hide();
    }
  }   
});