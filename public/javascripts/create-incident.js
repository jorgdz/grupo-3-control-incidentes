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

const pelajeAnimalPerdido = document.querySelector('#pelaje_animal_perdido')
const selectTamanioAnimal = document.querySelector('#select-tamanio-animal')
const selectTipoMascota = document.querySelector('#select-tipo-mascota')
const razaAnimalPerdido = document.querySelector('#raza_animal_perdido')

const desSospechoso = document.querySelector('#des_sospechoso')
const pertenenciasHurtadas = document.querySelector('#pertenencias_hurtadas')

const lugarAgresion = document.querySelector('#lugar_agresion')

const selectTipoDesastre = document.querySelector('#select-tipo-desastre')

const selectTipoAccidente = document.querySelector('#select-tipo-accidente')

export default function create () {
  const tipoIncidente = document.querySelector('#tipo_incidente_id')
  const btnPub = document.querySelector('#btnPub')
  hideAll()
  
  tipoIncidente.addEventListener('change', function () {
    if (tipoIncidente.value == 1) {
      $('#persona-afectada-violencia').show(300)
      $('#tipo-agresion-violencia').show(300)
      $('#uso-armas-violencia').show(300)

      $('#pelaje-animal').hide(300)
      $('#tamanio-animal').hide(300)
      $('#tipo_mascota').hide(300)
      $('#raza-animal').hide(300)
      $('#descripcion-sospechoso').hide(300)
      $('#pertenencias-hurtadas').hide(300)
      $('#lugar-agresion').hide(300)
      $('#tipo-desastre').hide(300)
      $('#tipo-accidente').hide(300)
    } else if (tipoIncidente.value == 2) {
      $('#pelaje-animal').show(300)
      $('#tamanio-animal').show(300)
      $('#tipo_mascota').show(300)
      $('#raza-animal').show(300)

      $('#persona-afectada-violencia').hide(300)
      $('#tipo-agresion-violencia').hide(300)
      $('#uso-armas-violencia').hide(300)
      $('#descripcion-sospechoso').hide(300)
      $('#pertenencias-hurtadas').hide(300)
      $('#lugar-agresion').hide(300)
      $('#tipo-desastre').hide(300)
      $('#tipo-accidente').hide(300)
    } else if (tipoIncidente.value == 3) {
      $('#persona-afectada-violencia').show(300)
      $('#descripcion-sospechoso').show(300)
      $('#uso-armas-violencia').show(300)
      $('#pertenencias-hurtadas').show(300)

      $('#tipo-agresion-violencia').hide(300)
      $('#lugar-agresion').hide(300)
      $('#tipo-desastre').hide(300)
      $('#tipo-accidente').hide(300)
      $('#pelaje-animal').hide(300)
      $('#tamanio-animal').hide(300)
      $('#tipo_mascota').hide(300)
      $('#raza-animal').hide(300)
    } else if (tipoIncidente.value == 4) {
      $('#uso-armas-violencia').show(300)
      $('#persona-afectada-violencia').show(300)
      $('#descripcion-sospechoso').show(300)
      $('#lugar-agresion').show(300)

      $('#tipo-agresion-violencia').hide(300)
      $('#tipo-desastre').hide(300)
      $('#tipo-accidente').hide(300)
      $('#pelaje-animal').hide(300)
      $('#tamanio-animal').hide(300)
      $('#tipo_mascota').hide(300)
      $('#raza-animal').hide(300)
      $('#pertenencias-hurtadas').hide(300)
    } else if (tipoIncidente.value == 5) {
      $('#uso-armas-violencia').show(300)
      $('#lugar-agresion').show(300)

      $('#persona-afectada-violencia').hide(300)
      $('#descripcion-sospechoso').hide(300)
      $('#tipo-agresion-violencia').hide(300)
      $('#tipo-desastre').hide(300)
      $('#tipo-accidente').hide(300)
      $('#pelaje-animal').hide(300)
      $('#tamanio-animal').hide(300)
      $('#tipo_mascota').hide(300)
      $('#raza-animal').hide(300)
      $('#pertenencias-hurtadas').hide(300)
    } else if (tipoIncidente.value == 6) {
      $('#tipo-desastre').show(300)

      $('#uso-armas-violencia').hide(300)
      $('#lugar-agresion').hide(300)
      $('#persona-afectada-violencia').hide(300)
      $('#descripcion-sospechoso').hide(300)
      $('#tipo-agresion-violencia').hide(300)
      $('#tipo-accidente').hide(300)
      $('#pelaje-animal').hide(300)
      $('#tamanio-animal').hide(300)
      $('#tipo_mascota').hide(300)
      $('#raza-animal').hide(300)
      $('#pertenencias-hurtadas').hide(300)
    } else if (tipoIncidente.value == 7) {
      $('#tipo-accidente').show(300)

      $('#uso-armas-violencia').hide(300)
      $('#lugar-agresion').hide(300)
      $('#persona-afectada-violencia').hide(300)
      $('#descripcion-sospechoso').hide(300)
      $('#tipo-agresion-violencia').hide(300)
      $('#tipo-desastre').hide(300)
      $('#pelaje-animal').hide(300)
      $('#tamanio-animal').hide(300)
      $('#tipo_mascota').hide(300)
      $('#raza-animal').hide(300)
      $('#pertenencias-hurtadas').hide(300)
    } else {
      hideAll()
      $('#files_incident').remove()
      $('#adjuntos').append('<input type="file" name="adjunto" id="files_incident" accept="image/*" multiple="multiple">')
    }
  }, false)

  btnPub.addEventListener('click', function () {
    if (tipoIncidente.value == 0) {
      alert('Seleccione un tipo de incidente')
    } else {
      $('#cover-spin').show(0)
      addIncident(tipoIncidente.value)
        .then(res => {
          $('#cover-spin').hide(0)
          let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
          //let socket = io('http://localhost:5000', { 'forceNew': true })
          
          socket.on('connect', async function () {
            socket.emit('data', {
              success: '1',
              response: res
            })
          })
  
          tipoIncidente.value = 0
          description.value = ''
          ninoViolencia.checked = false
          hombreViolencia.checked = false
          mujerViolencia.checked = false
          adultoMayorViolencia.checked = false
          otroParienteViolencia.checked = false
          verbalViolencia.checked = false
          fisicaViolencia.checked = false
          psicologicaViolencia.checked = false
          armacortopunzanteViolencia.checked = false
          armafuegoViolencia.checked =false
          otraarmaViolencia.checked = false
          pelajeAnimalPerdido.value = ''
          selectTamanioAnimal.value = 'null'
          selectTipoMascota.value = 'null'
          razaAnimalPerdido.value = ''
          desSospechoso.value = ''
          pertenenciasHurtadas.value = ''
          lugarAgresion.value = ''
          selectTipoDesastre.value = 'null'
          selectTipoAccidente.value = 'null'
          
          $('#files_incident').remove()
          $('#adjuntos').append('<input type="file" name="adjunto" id="files_incident" accept="image/*" multiple="multiple">')
  
          hideAll()
          
          socket.on('disconnect', function () {})
        })
    }
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
  } else if (tipoIncidente == 2) {
    detalles = {
      pelaje_animal: pelajeAnimalPerdido.value,
      tamanio_animal: selectTamanioAnimal.value,
      tipo_mascota: selectTipoMascota.value,
      raza_animal: razaAnimalPerdido.value
    }
  } else if (tipoIncidente == 3) {
    let personaAfectada = []
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

    if (armacortopunzanteViolencia.checked) {
      usoArma.push(armacortopunzanteViolencia.value)
    } else if (armafuegoViolencia.checked) {
      usoArma.push(armafuegoViolencia.value)
    } else if (otraarmaViolencia.checked) {
      usoArma.push(otraarmaViolencia.value)
    }

    detalles = {
      persona_afectada: personaAfectada,
      descripcion_sospechoso: desSospechoso.value,
      uso_arma: usoArma,
      pertenencias_hurtadas: pertenenciasHurtadas.value
    }
  } else if (tipoIncidente == 4) {
    let usoArma = []
    let personaAfectada = []

    if (armacortopunzanteViolencia.checked) {
      usoArma.push(armacortopunzanteViolencia.value)
    } else if (armafuegoViolencia.checked) {
      usoArma.push(armafuegoViolencia.value)
    } else if (otraarmaViolencia.checked) {
      usoArma.push(otraarmaViolencia.value)
    }

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

    detalles = {
      uso_arma: usoArma,
      persona_afectada: personaAfectada,
      descripcion_sospechoso: desSospechoso.value,
      lugar_agresion: lugarAgresion.value
    }
  } else if (tipoIncidente == 5) {
    let usoArma = []
    if (armacortopunzanteViolencia.checked) {
      usoArma.push(armacortopunzanteViolencia.value)
    } else if (armafuegoViolencia.checked) {
      usoArma.push(armafuegoViolencia.value)
    } else if (otraarmaViolencia.checked) {
      usoArma.push(otraarmaViolencia.value)
    }

    detalles = {
      uso_arma: usoArma,
      lugar_agresion: lugarAgresion.value
    }
  } else if (tipoIncidente == 6) {
    detalles = {
      tipo_desastre: selectTipoDesastre.value,
    }
  } else if (tipoIncidente == 7) {
    detalles = {
      tipo_accidente: selectTipoAccidente.value,
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

  var tags1 = $('#pelaje_animal_perdido').tagEditor('getTags')[0].tags
  if (tags1.length > 0) {
    for (var i = 0; i < tags1.length; i++) { $('#pelaje_animal_perdido').tagEditor('removeTag', tags1[i]); }
  }
  
  var tags2 = $('#raza_animal_perdido').tagEditor('getTags')[0].tags
  if (tags2.length > 0) {
    for (var i = 0; i < tags2.length; i++) { $('#raza_animal_perdido').tagEditor('removeTag', tags2[i]); }
  }
  
  var tags3 = $('#des_sospechoso').tagEditor('getTags')[0].tags
  if (tags3.length > 0) {
    for (var i = 0; i < tags3.length; i++) { $('#des_sospechoso').tagEditor('removeTag', tags3[i]); }
  }
  
  var tags4 = $('#pertenencias_hurtadas').tagEditor('getTags')[0].tags
  if (tags4.length > 0) {
    for (var i = 0; i < tags4.length; i++) { $('#pertenencias_hurtadas').tagEditor('removeTag', tags4[i]); }
  }

  $(".post-popup.job_post").removeClass("active")
  $(".wrapper").removeClass("overlay")

  return incidentCreated
}
