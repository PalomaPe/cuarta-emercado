let productUnitCost = 0;
let productCurrency = "";
let productUnits = 0;
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
var condiciones = false;

function updateTotalCosts() {
  let shippingCostHTML = document.getElementById("shippingCost");
  let totalCostHTML = document.getElementById("totalCost");

  let shippingCostToShow = Math.round((shippingPercentage * 100)) + "%";
  let totalCostToShow = (Math.round(subtotal * shippingPercentage * 100) / 100);

  shippingCostHTML.innerHTML = shippingCostToShow;
  totalCostHTML.innerHTML = totalCostToShow;
}

function showPaymentTypeNotSelected() {

  document.getElementById("formaDePagoSeleccionada").hidden = false;
}

function hidePaymentTypeNotSelected() {

  document.getElementById("formaDePagoSeleccionada").hidden = true;

}

function validarCamposCard() {

  document.getElementById("creditCardNumber").disabled = false;
  document.getElementById("creditCardSecurityCode").disabled = false;
  document.getElementById("dueDate").disabled = false;

  document.getElementById("bankAccountNumber").disabled = true;


}

function validarCamposBanking() {

  document.getElementById("creditCardNumber").disabled = true;
  document.getElementById("creditCardSecurityCode").disabled = true;
  document.getElementById("dueDate").disabled = true;

  document.getElementById("bankAccountNumber").disabled = false;

}


function validarLargoTarjeta() {

  let tarjeta = document.getElementById("creditCardNumber");
  let valor = tarjeta.value;
  let largoRequerido = 16;

  if (valor.length !== largoRequerido) {
    alert("La cantidad de digitos en Número de tarjeta no es correcta");
    return false;
  }
  else {
    condiciones = true;
    return true;
  }
}

function validarCharTarjeta() {

  let tarjeta = document.getElementById("creditCardNumber");
  let valor = tarjeta.value;
  let valoresPosibles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let esNumero = false;
  let i = 0;

  function validar(valor) {

    esNumero = valoresPosibles.includes(valor.charAt(0));
    while (i < valor.length && esNumero) {
      esNumero = valoresPosibles.includes(valor.charAt(i));
      i++;
    }

    if (!(esNumero)) {
      alert("Debe ingresar solo números");
      return false;
    }
    else {
      condiciones = true;
      return true;
    }
  };

  tarjeta.addEventListener("input", function () { validar(valor) });

};

function validarFecha() {

  let fechaIngresada = document.getElementById("dueDate");
  let valorFecha = fechaIngresada.value;
  let today = new Date();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear().toString();
  let yy = "";
  let mmIngresado = "";
  let yyIngresado = "";

  function digitosAño(yyyy) {

    for (let i = 2; i < 4; i++) {
      yy = yy + yyyy.charAt(i);
    }
    yy = parseInt(yy);
  }

  function validarFechaMenorActual(date) {

    digitosAño(yyyy);

    function obtenerMesYAñoIngresado(fecha) {

      for (let i = 0; i < 2; i++) {
        mmIngresado = mmIngresado + fecha.charAt(i);
      }
      mmIngresado = parseInt(mmIngresado);

      for (let i = 3; i < 5; i++) {
        yyIngresado = yyIngresado + fecha.charAt(i);
      }
      yyIngresado = parseInt(yyIngresado);
    }

    obtenerMesYAñoIngresado(valorFecha);

    if (yy <= yyIngresado) {
      if (yy == yyIngresado) {
        if (mm <= mmIngresado) {
          condiciones = true;
          return true;
        }
        else {
          alert("La tarjeta ha caducado");
          return false;
        }
      }
      else {
        condiciones = true;
        return true;
      }
    }
    else {
      alert("La tarjeta ha caducado");
      return false;
    }
  }

  validarFechaMenorActual(valorFecha);
}

function validarNumeroCuenta() {

  let numeroCuenta = document.getElementById("bankAccountNumber");
  let valorNumero = numeroCuenta.value;

  if (valorNumero.length >= 20) {
    return true;
  }
  else {
    alert("Debe ingresar 20 dígitos o mas");
    return false;
  }
}

function formularioCompleto() {

  if (document.getElementById("creditCardPaymentRadio").checked) {
    if ( condiciones ) {
      hidePaymentTypeNotSelected();
    }
    else {
      showPaymentTypeNotSelected();
    }
  }

  if (document.getElementById("bankingRadio").checked) {
    if (validarNumeroCuenta()) {
      hidePaymentTypeNotSelected();
    }
    else {
      showPaymentTypeNotSelected();
    }
  }
}

function finalizarCompra() {
  if ( document.getElementById("formaDePagoSeleccionada").hidden ) {
    window.open("https://japdevdep.github.io/ecommerce-api/cart/buy.json");
  }
}

function bigImg(x) {
  x.style.height = "110px";
  x.style.width = "110px";
}

function normalImg(x) {
  x.style.height = "80px";
  x.style.width = "80px";
}

function showArticles(articles) {

  let indexIdInput = "";
  let indexIdSubtotal = "";

  htmlContentToAppend = "";
  for (let i = 0; i < articles.length; i++) {
    let article = articles[i];

    indexIdInput = "index" + i;
    indexIdSubtotal = "indexSubtotal" + i;

    htmlContentToAppend += `
        <tr>
            <td><img onmouseover="bigImg(this)" onmouseout="normalImg(this)" width="80" src="` + article.src + `"></td>
            <td><h4>`+ article.name + `</h4></td>
            <td><span>` + article.currency + " " + `</span><span id="productUnitCostHTML" value="1">` + article.unitCost + `</span></td>
            <td><input class="form-control" style="width:68px" type="number" id="` + indexIdInput + `" placeholder="" required="" value="` + article.count + `" min="0"></td>
            <td id="` + indexIdSubtotal + `">` + article.currency + " " + article.unitCost * article.count + `</td>
        </tr>
        `
    document.getElementById("articleRowContainer").innerHTML = htmlContentToAppend;

    productUnits = article.count;
    subtotal = article.unitCost * article.count;
    productCurrency = article.currency;

    let subtotalCost = document.getElementById("subtotalCost");
    subtotalCost.innerHTML = article.currency + " " + article.unitCost * article.count;

  }
}


function changeUnitsListener(articles, i) {

  let indexIdInputUPDATE = "index" + i;
  let indexIdSubtotalUPDATE = "indexSubtotal" + i;

  document.getElementById(indexIdInputUPDATE).addEventListener("change", function () {
    productUnits = document.getElementById(indexIdInputUPDATE).value;
    let productTotalCostHTML = document.getElementById(indexIdSubtotalUPDATE);
    let productTotalCost = articles.currency + " " + (articles.unitCost * productUnits);
    productTotalCostHTML.innerHTML = productTotalCost;

    let subtotalCost = document.getElementById("subtotalCost");
    subtotalCost.innerHTML = productTotalCost;

    subtotal = productUnits * articles.unitCost;

    updateTotalCosts();

  })
}

function articlesListener(articles) {

  for (let i = 0; i < articles.length; i++) {
    changeUnitsListener(articles[i], i)
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cartInfo = resultObj.data;
      showArticles(cartInfo.articles);
    }

    articlesListener(cartInfo.articles);

  });
});

document.addEventListener("DOMContentLoaded", function (e) {

  document.getElementById("subtotalCost").addEventListener("change", function () {
    subtotal = document.getElementById("subtotalCost");
    updateTotalCosts();
  });

  document.getElementById("premiumradio").addEventListener("change", function () {
    shippingPercentage = 0.15;
    updateTotalCosts();
  });

  document.getElementById("expressradio").addEventListener("change", function () {
    shippingPercentage = 0.07;
    updateTotalCosts();
  });

  document.getElementById("standardradio").addEventListener("change", function () {
    shippingPercentage = 0.05;
    updateTotalCosts();
  });
});
