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

  let socket = io('ws://incident-web.herokuapp.com', { 'forceNew': true })

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
    }
  })

  createIncident()
}, false)
