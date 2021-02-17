
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

window.addEventListener('load', async function () {

  let incidents = await getIncidents();
  incidents.map(incident => {
    incidentContainer.append(getIncidentFromTemplate(incident))

    attend(incident)
  })

  let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
  //let socket = io('http://localhost:5000', { 'forceNew': true })

  socket.on('data', async function (data) {
    if (data.success == 1) {
      incidentContainer.prepend(getIncidentFromTemplate(data.response))
      
      attend(data.response)
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

const goAttend = async (id) => {
  let url = `/valle-verde/api/${id}/incidentes/attention`
  const data = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const attend = data.json()
  return attend
}

const attend = function (incident) {
  document.querySelector(`#attend-incident-${incident.id}`).addEventListener('click', function () {
    goAttend (incident.id)
      .then(response => {
        let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
        //let socket = io('http://localhost:5000', { 'forceNew': true })
        socket.on('connect', async function () {
          socket.emit('data', {
            success: '2',
            response: response
          })
        })
        socket.on('disconnect', function () {})

        document.querySelector('#totalAtenciones').textContent = parseInt(document.querySelector('#totalAtenciones').textContent) + 1
        $(`#attend-incident-${incident.id}`).hide(300)

      })
  })
}

const getIncidentFromTemplate = (incident) => {

  let showBtnAttend = '';
  if (incident.estado === 'NO ATENDIDO') {
    showBtnAttend += `<a id="attend-incident-${incident.id}" href="#!" class="card-link">Atender</a>`
  }

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
          ${showBtnAttend}
      </div>
  </div>`
  );

}
