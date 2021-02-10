export default function create () {
  const tipoIncidente = document.querySelector('#tipo_incidente_id')
  const btnPub = document.querySelector('#btnPub')
  hideAll()
  
  tipoIncidente.addEventListener('change', function () {
    if (tipoIncidente.value == 1) {
      $('#persona-afectada-violencia').show(300)
      $('#tipo-agresion-violencia').show(300)
      $('#uso-armas-violencia').show(300)
    } else {
      hideAll()
    }
  }, false)

  btnPub.addEventListener('click', function () {
    addIncident(tipoIncidente.value)
      .then(res => {
        let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
        //let socket = io('http://localhost:5000', { 'forceNew': true })
        socket.on('connect', async function () {
          socket.emit('data', {
            success: '1',
            response: res
          })
        })

        socket.on('disconnect', function () {})
      })
  })
}

function hideAll() {
  $('#persona-afectada-violencia').hide(300)
  $('#tipo-agresion-violencia').hide(300)
  $('#uso-armas-violencia').hide(300)
  $('#pelaje-animal').hide(300)
  $('#raza-animal').hide(300)
  $('#tamanio-animal').hide(300)
  $('#tipo_mascota').hide(300)
  $('#descripcion-sospechoso').hide(300)
  $('#pertenencias-hurtadas').hide(300)
  $('#lugar-agresion').hide(300)
  $('#tipo-desastre').hide(300)
  $('#tipo-accidente').hide(300)
}

async function addIncident (tipoIncidente) {
  let endpoint = '/valle-verde/api/incident'
  let formData = new FormData()
  const filesIncident = document.querySelector('#files_incident')
  const description = document.querySelector('#description')
  
  const ninoViolencia = document.querySelector('#nino_violencia')
  const hombreViolencia = document.querySelector('#hombre_violencia')
  const mujerViolencia = document.querySelector('#mujer_violencia')
  const adultoMayorViolencia = document.querySelector('#adulto_mayor_violencia')
  const otroParienteViolencia = document.querySelector('#otro_pariente_violencia')
  
  const verbalViolencia = document.querySelector('#verbal_violencia')
  const fisicaViolencia = document.querySelector('#fisica_violencia')
  const psicologicaViolencia = document.querySelector('#psicologica_violencia')
  
  const armacortopunzanteViolencia = document.querySelector('#armacortopunzante_violencia')
  const armafuegoViolencia = document.querySelector('#armafuego_violencia')
  const otraarmaViolencia = document.querySelector('#otraarma_violencia')

  let detalles = {}

  // Violencia intrafamiliar
  if (tipoIncidente == 1) {
    let personaAfectada = []
    let tipoAgresion = []
    let usoArma = []

    if (ninoViolencia.checked) {
      personaAfectada.push(ninoViolencia.value)
    } else if (hombreViolencia.checked) {
      personaAfectada.push(hombreViolencia.value)
    } else if (mujerViolencia.checked) {
      personaAfectada.push(mujerViolencia.value)
    } else if (adultoMayorViolencia.checked) {
      personaAfectada.push(adultoMayorViolencia.value)
    } else if (otroParienteViolencia.checked) {
      personaAfectada.push(otroParienteViolencia.value)
    } 
    
    if (verbalViolencia.checked) {
      tipoAgresion.push(verbalViolencia.value)
    } else if (fisicaViolencia.checked) {
      tipoAgresion.push(fisicaViolencia.value)
    } else if (psicologicaViolencia.checked) {
      tipoAgresion.push(psicologicaViolencia.value)
    } 
    
    if (armacortopunzanteViolencia.checked) {
      usoArma.push(armacortopunzanteViolencia.value)
    } else if (armafuegoViolencia.checked) {
      usoArma.push(armafuegoViolencia.value)
    } else if (otraarmaViolencia.checked) {
      usoArma.push(otraarmaViolencia.value)
    }

    detalles = {
      persona_afectada: personaAfectada,
      tipo_agresion: tipoAgresion,
      uso_arma: usoArma
    }
  }

  formData.append('descripcion', description.value)
  formData.append('tipo_incidente_id', tipoIncidente)
  formData.append('detalles', JSON.stringify(detalles))
  
  if (filesIncident.files.length > 0) {
    for (const file of filesIncident.files) {
      formData.append('file', file)
    }
  }

  const data = await fetch(endpoint, {
    method: 'POST',
    body: formData
  })
  const incidentCreated = data.json()

  $(".post-popup.job_post").removeClass("active")
  $(".wrapper").removeClass("overlay")

  return incidentCreated
}
