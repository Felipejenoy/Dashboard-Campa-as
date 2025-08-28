async function cargarDatos() {
  const response = await fetch("data.json");
  const data = await response.json();
  return data.campañas;
}

cargarDatos().then(campañas => {
  const nombres = campañas.map(c => c.nombre);
  const respuestas = campañas.map(c => c.respuestas);
  const clics = campañas.map(c => c.clics);
  const segmentos = [...new Set(campañas.map(c => c.segmento))]; // Únicos

  // Gráfico de respuestas
  new Chart(document.getElementById("respuestasChart"), {
    type: "bar",
    data: {
      labels: nombres,
      datasets: [{
        label: "Respuestas",
        data: respuestas
      }]
    }
  });

  // Gráfico de clics
  new Chart(document.getElementById("clicsChart"), {
    type: "line",
    data: {
      labels: nombres,
      datasets: [{
        label: "Clics",
        data: clics
      }]
    }
  });

  // Gráfico de segmentación
  new Chart(document.getElementById("segmentacionChart"), {
    type: "pie",
    data: {
      labels: segmentos,
      datasets: [{
        label: "Segmentos",
        data: segmentos.map(s => campañas.filter(c => c.segmento === s).length)
      }]
    }
  });
});
