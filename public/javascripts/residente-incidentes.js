import templateIncident from './templatesJS/templateIncident.js'
import createIncident from './create-incident.js'

const getIncidents = async function () {
  let url = '/valle-verde/api/incidentes'
  const data = await fetch(url)
  const incidentes = data.json()
  return incidentes
}

const getUserAuth = async function () {
  let url = '/valle-verde/api/auth/user'
  const data = await fetch(url)
  const user = data.json()
  return user
}

const updateIncident = async function (id, body) {
  let url = `/valle-verde/api/${id}/incidentes`
  const data = await fetch(url, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const incidente = data.json()
  return incidente
}

const _incidentsFeed = function (data, user) {
  let postIncident = $('#post-incident')
  postIncident.innerHTML = ''

  data.map(incident  => {
    postIncident.append(templateIncident(incident))

    $(`#open-pots-incidents-${incident.id}`).on("click", function(){
      $(this).next(`#options-incident-${incident.id}`).toggleClass("active");
      return false;
    })

    if(user.id == incident.residente.user.id) {
      document.querySelector(`#opts-ed-incidents-${incident.id}`).style.display = 'block'
    }

    $(`#descripcion-incident-elem-${incident.id}`).hide()

    document.querySelector(`#editarInicident-${incident.id}`).addEventListener('click', function () {
      $(`#descripcion-incident-elem-${incident.id}`).show(300)
      $(`#descripcion-incident-${incident.id}`).hide(300)
    })

    document.querySelector(`#btnEdit${incident.id}`).addEventListener('click', function () {
      let input = document.querySelector(`#des-input-incident-${incident.id}`)
      let body = { descripcion: input.value }
      
      updateIncident(incident.id, body)
        .then(response => {
          $(`#descripcion-incident-elem-${incident.id}`).hide(300)
          $(`#descripcion-incident-${incident.id}`).show(300)
          document.querySelector(`#descripcion-incident-${incident.id}`).textContent = body.descripcion
          document.querySelector(`#des-input-incident-${incident.id}`).value = body.descripcion
        })
    })

    document.querySelector(`#btnCancel${incident.id}`).addEventListener('click', function () {
      $(`#descripcion-incident-elem-${incident.id}`).hide(300)
      $(`#descripcion-incident-${incident.id}`).show(300)
    })
  })
}

const drawIncidents = async function (data) {
  const user = await getUserAuth()

  _incidentsFeed(data, user)
}

window.addEventListener('load', function () {
  getIncidents()
    .then(res => {
      drawIncidents(res).then(response => response)
    })

  //let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
  let socket = io('http://localhost:5000', { 'forceNew': true })
  socket.on('data', async function (data) {
    if (data.success == 1) {
      let postIncident = $('#post-incident')
      postIncident.prepend(templateIncident(data.response))

      const user = await getUserAuth()
      
      if(user.id == data.response.residente.user.id) {
        document.querySelector(`#opts-ed-incidents-${data.response.id}`).style.display = 'block'
      }

      $(`#open-pots-incidents-${data.response.id}`).on("click", function() {
        $(this).next(`#options-incident-${data.response.id}`).toggleClass("active");
        return false;
      })

      $(`#descripcion-incident-elem-${data.response.id}`).hide()
      
      document.querySelector(`#editarInicident-${data.response.id}`).addEventListener('click', function () {
        $(`#descripcion-incident-elem-${data.response.id}`).show(300)
        $(`#descripcion-incident-${data.response.id}`).hide(300)
      })

      document.querySelector(`#btnEdit${data.response.id}`).addEventListener('click', function () {
        let input = document.querySelector(`#des-input-incident-${data.response.id}`)
        let body = { descripcion: input.value }
        updateIncident(data.response.id, body)
          .then(response => {
            $(`#descripcion-incident-elem-${data.response.id}`).hide(300)
            $(`#descripcion-incident-${data.response.id}`).show(300)
            document.querySelector(`#descripcion-incident-${data.response.id}`).textContent = body.descripcion
            document.querySelector(`#des-input-incident-${data.response.id}`).value = body.descripcion
        })
      })

      document.querySelector(`#btnCancel${data.response.id}`).addEventListener('click', function () {
        $(`#descripcion-incident-elem-${data.response.id}`).hide(300)
        $(`#descripcion-incident-${data.response.id}`).show(300)
      })
    }
  })

  createIncident()
}, false)
