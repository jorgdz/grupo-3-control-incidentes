import templateIncidentAdmin from './templatesJS/templateIncidentAdmin.js'

const incidentsContainer = document.querySelector('.incidents-container')

const selectEstado = document.querySelector('#select-estado')
const fechaInicio = document.querySelector('#fecha_inicio')
const fechaFin = document.querySelector('#fecha_fin')

const getIncidents = async (estado = '', fecha_inicio = '', fecha_fin = '') => {
	let url = `/valle-verde/api/incidents/attention?estado=${estado}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
	const data = await fetch(url)

	return data.json()
}

selectEstado.addEventListener('change', async function () {
	getDataIncidents()
})

fechaInicio.addEventListener('change', async function () {
	getDataIncidents()
})

fechaFin.addEventListener('change', async function () {
	getDataIncidents()
})

async function getDataIncidents () {
	let data = undefined
	data = await getIncidents(selectEstado.value)
	
	if (fechaInicio.value != '' && fechaFin.value != '') {
		data = await getIncidents(selectEstado.value, fechaInicio.value, fechaFin.value)
	}

	drawIncidents(data)
}

function drawIncidents (data) {
	incidentsContainer.innerHTML = ''

	data.map(i => {
		incidentsContainer.insertAdjacentHTML('beforeend', templateIncidentAdmin(i))
	})
}

window.addEventListener('load', async function () {
	const data = await getIncidents()
	drawIncidents(data)
}, false)
