import templateMyIncident from './templatesJS/templateMyIncident.js'

const getIncidents = async function (username) {
  let url = '/perfil/api/user-incidents/' + username 
  const data = await fetch(url)
  const incidentes = data.json()
  return incidentes
}

window.addEventListener('load', async function () {
  let arrayUrl = window.location.pathname.split('/')
  const incidents = await getIncidents(arrayUrl[arrayUrl.length - 1])

  let postIncident = $('#post-incident')
  postIncident.innerHTML = ''

  incidents.map(incident => {
    postIncident.append(templateMyIncident(incident))
  })
})
