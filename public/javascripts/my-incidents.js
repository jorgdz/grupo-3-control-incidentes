import templateMyIncident from './templatesJS/templateMyIncident.js'

const getIncidents = async function () {
  let url = '/valle-verde/api/my-incidents'
  const data = await fetch(url)
  const incidentes = data.json()
  return incidentes
}

window.addEventListener('load', async function () {
  const incidents = await getIncidents()

  let postIncident = $('#post-incident')
  postIncident.innerHTML = ''

  incidents.map (incident => {
    postIncident.append(templateMyIncident(incident))
  })
})
