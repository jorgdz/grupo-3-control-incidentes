const selectMes = document.querySelector('#select-mes')
const incidentsByMonth = document.querySelector('#incidents-by-month')
const printIncidents = document.querySelector('#print-incidents')

const currentMonth = (new Date()).getMonth() + 1
selectMes.getElementsByTagName('option')[currentMonth - 1].selected = 'selected'

async function getIncidentsByMonth () {
    const data = await fetch(`/incidentes-por-meses/api/${selectMes.value}/all`)
    return data.json()
}

async function drawIncidentsByMonth () {
    printIncidents.href = `/incidentes-por-meses/${selectMes.value}/report`
    const incidents = await getIncidentsByMonth()
    incidentsByMonth.innerHTML = ''
    incidents.map (incident => {
        incidentsByMonth.insertAdjacentHTML('beforeend', drawElem(incident))
    })
}

selectMes.addEventListener('change', async () => {
    await drawIncidentsByMonth()
})

window.addEventListener('load', async () => {
    await drawIncidentsByMonth()
}, false)

const drawElem = function (row) {
    return `
        <tr>
            <td>${row.id}</td>
            <td>${row.descripcion}</td>
            <td>${row.tipo}</td>
            <td>${row.gravedad}</td>
            <td>${row.estado}</td>
            <td>
                <a href="/valle-verde/${row.id}/incidente" class="btn btn-info"><i class="fa fa-eye"></i></a>
            </td>
        </tr>
    `
}
