// variable de prueba para cargar datos
var data = []

fetch('./data.json')
    .then((response) => response.json())
    .then((json) => data=json.ubigeo_inei);


//Variables necesarias
var arrSimilarity = [];
var tbody = document.getElementById('tbody');


//Funcion igualar las longitudes de dos cadenas
function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

//Funcion para conocer el porcentaje de similitud
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}


//Funcion para regular la similitud entre todos los datos
function fsimilarity(input){
    for(let i = 0; i<data.length; i++){
        if(similarity(input, data[i].distrito)>=0.60){
          arrSimilarity.push(data[i])
          let tr = document.createElement("tr");
          let ubigeo = document.createElement("th");
          let distrito = document.createElement("td");
          let provincia = document.createElement("td");
          let departamento = document.createElement("td");

          ubigeo.innerHTML = "<th scope='row'> "+ data[i].ubigeo+" </th>"
          distrito.innerHTML = "<td> "+ data[i].distrito + " </td>"
          provincia.innerHTML = "<td> "+ data[i].provincia+" </td>"
          departamento.innerHTML = "<td> "+ data[i].departamento + " </td>"

          tr.appendChild(ubigeo);
          tr.appendChild(distrito);
          tr.appendChild(provincia);
          tr.appendChild(departamento);
          tbody.appendChild(tr);
        }
    }
}

//Evento para inicial la similitud a partir de una palabra
search.addEventListener('click', function(){




  while (tbody.firstChild) {
    tbody.removeChild(tbody.lastChild);
  }
  setTimeout(() => {      fsimilarity(input.value)
    ; }, 200);

    console.log(arrSimilarity)

})


