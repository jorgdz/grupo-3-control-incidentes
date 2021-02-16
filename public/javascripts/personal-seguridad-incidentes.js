
/** Consts
==================================================================== */
const DEFAULT_URL = "https://www.seekpng.com/png/detail/423-4235598_no-image-for-noimage-icon.png";

const SEVERITY = {
  
  "GRAVE": "danger", 
  "NO TAN GRAVE": "warning",
  "LEVES": "success", 
  "NO CATEGORIZADO": "secondary"

};

/** Elements
==================================================================== */
let incidentContainer = $(".incidents-container");
/** Listeners
==================================================================== */

window.addEventListener('load', async () => {

  let incidents = await getIncidents();
  incidents.map(incident => {
    incidentContainer.append(getIncidentFromTemplate(incident))
  })

  let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
  //let socket = io('http://localhost:5000', { 'forceNew': true })

  socket.on('data', async function (data) {
    if (data.success == 1) {
      incidentContainer.prepend(getIncidentFromTemplate(data.response))
    }
  })

})

/** Functions
==================================================================== */

const getIncidents = async () => {
  
  let url = '/valle-verde/api/incidentes/employee'
  const data = await fetch(url)
  const incidentes = data.json()
  return incidentes

}

const getIncidentFromTemplate = (incident) => {

 return (`
    <div class="card mt-4" style="width: 16rem;">
      <figure style="overflow: hidden";>
          <div class="gravedad bg-${SEVERITY[incident.tipo.gravedad]}">
            ${incident.tipo.gravedad.toLowerCase()}
          </div>
          <img class="card-img-top"
          src="${incident.adjuntos.length == 0 ? DEFAULT_URL : incident.adjuntos[0].url}"
          alt="Card image cap" style="height: 180px; width: 286px"></figure>
      <div class="card-body">
          <h5 class="card-title">
            ${incident.residente.villa.bloque.nombre}: ${incident.residente.villa.numero}
          </h5>
          <p class="card-text">
            <span class="d-inline-block">
              ${incident.descripcion.substr(0, 34)}
            </span>
        </p>
      </div>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">${incident.tipo.tipo}</li>
          
      </ul>
      <div class="card-body">
          <a href="/valle-verde/api/incidente/${incident.id}" class="card-link">Detalles</a>
          <a id="attend-incident" href="/valle-verde/api/${incident.id}/incidentes/attention" onclick="event.preventDefault(); (confirm('¿ ATENDER ESTE INCIDENTE ?')) ? document.getElementById('attend-form-${incident.id}').submit() : false;" class="card-link">Atender</a>
          <form id="attend-form-${incident.id}" action="/valle-verde/api/${incident.id}/incidentes/attention" method="POST" style="display: none;"></form>
      </div>
    </div>`
    );

}
