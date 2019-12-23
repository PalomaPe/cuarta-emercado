var contraseñaOculta = function (contraseña) {

    var largo = contraseña.length;
    var contraseñaOculta = "";
    for (var i = 0; i < largo; i++) {
        contraseñaOculta += "*";
    }
    return contraseñaOculta;

}

function almacenarNombre(nombre) {
    sessionStorage.setItem("usuario", nombre);
}


function tomarDatos() {

    var usuarioIngresado = document.getElementById("email_input").value;
    var contraseñaIngresada = document.getElementById("password_input").value;

    almacenarNombre(usuarioIngresado);

    alert(usuarioIngresado + "\n" + contraseñaOculta(contraseñaIngresada));
    
}

function adjuntarNombre() {

    if (sessionStorage.getItem("usuario") !== null) {
        document.getElementById("nombreEnPantalla").innerHTML = sessionStorage.getItem("usuario") + ' ˅ ';
        document.getElementById("botonIngresar").hidden = "true";
        document.getElementById('botonNombre').style.display = 'block';
        document.getElementById("botonCarrito").hidden = "true"
    }
}

function init() {
  gapi.load('auth2', function() {
    gapi.auth2.init({
  client_id: '349945855178-el2pft8i9nf5pdeniuv5jf82r5h9rind.apps.googleusercontent.com'
})
  });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
}

function agregarBotonSignOut() {
    document.getElementById("botonSignOut").style.display = 'block';
}

function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      
      document.getElementById("botonSignOut").style.display = 'none';
    }

function onLoad() {
      gapi.load('auth2', function() {
        gapi.auth2.init();
      });
    }

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function mostrarMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onmouseover = function (event) {
    if (!event.target.matches('.nav-link')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function mouseOverCarrito() {
    document.getElementById("grisCarrito").style.color = "rgb(190, 192, 194)";
}

function mouseOutCarrito() {
    document.getElementById("grisCarrito").style.color = "white";
  }

  function mouseOverCerrar() {
    document.getElementById("grisCerrar").style.color = "rgb(190, 192, 194)";
}

function mouseOutCerrar() {
    document.getElementById("grisCerrar").style.color = "white";
  }

function cerrarSession() {
    sessionStorage.clear();
    document.getElementById("botonIngresar").hidden = "false";
    document.getElementById('botonNombre').style.display = 'none';
    document.getElementById("botonCarrito").hidden = "false"
}

