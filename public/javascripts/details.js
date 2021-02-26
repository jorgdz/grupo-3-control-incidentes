const detailIncidentJson = $('#detail_incident_json')

window.addEventListener('load', async function () {
  if (detailIncidentJson.text() != '') {
    let details = JSON.parse(detailIncidentJson.text())

    detailIncidentJson.html('')
    detailIncidentJson.append(template(details))
  }
})

const template = (details) => {
  
  let personaAfectada = ''
  if (details.persona_afectada != undefined) {
    details.persona_afectada.map ((pa, index) => {
      if (index == details.persona_afectada.length - 1) {
        personaAfectada = `${pa}`
      } else {
        personaAfectada = `${pa} ,`
      }
    })
  }
  
  let tipoAgresion = ''
  if (details.tipo_agresion != undefined) {
    details.tipo_agresion.map ((tipo, index) => {
      if (index == details.tipo_agresion.length - 1) {
        tipoAgresion += `${tipo}`
      } else {
        tipoAgresion += `${tipo} ,`
      }
    })
  }

  let usoArmas = ''
  if (details.uso_arma != undefined) {
    details.uso_arma.map ((arma, index) => {
      if (index == details.uso_arma.length - 1) {
        usoArmas += `${arma}`
      } else {
        usoArmas += `${arma} ,`
      }
    })
  }

  return (`<div class="card">
      <div class="card-header">
        Detalles
      </div>
      <div class="card-body">
        ${details.descripcion_sospechoso != undefined && details.descripcion_sospechoso != '' ? `<h5 class="card-title">Descripción del sospechoso: ${details.descripcion_sospechoso}</h5>` : ''}
        
        ${details.tipo_desastre != undefined && details.tipo_desastre != '' ? `<h5 class="card-title">Tipo de desastre: ${details.tipo_desastre}</h5>` : ''}
        
        ${details.lugar_agresion != '' && details.lugar_agresion != undefined ? `<p><strong>Lugar de agresión:</strong> ${details.lugar_agresion}</p>` : ''}
        
        ${details.pertenencias_hurtadas != '' && details.pertenencias_hurtadas != undefined ? `<p><strong>Pertenencias hurtadas:</strong> ${details.pertenencias_hurtadas}</p>` : ''}

        ${tipoAgresion != '' ? `<p>Tipo de agresión: ${tipoAgresion}</p>` : '' }

        ${details.pelaje_animal != '' && details.pelaje_animal != undefined ? `<p>Pelaje del animal: ${details.pelaje_animal}</p>` : '' }
        ${details.tamanio_animal != '' && details.tamanio_animal != undefined ? `<p>Tamaño del animal: ${details.tamanio_animal}</p>` : '' }
        ${details.tipo_mascota != '' && details.tipo_mascota != undefined ? `<p>Tipo de mascota: ${details.tipo_mascota}</p>` : '' }
        ${details.raza_animal != '' && details.raza_animal != undefined ? `<p>Raza del animal: ${details.raza_animal}</p>` : '' }

        ${details.tipo_accidente != '' && details.tipo_accidente != undefined ? `<p>Tipo de accidente: ${details.tipo_accidente}</p>` : '' }

        ${personaAfectada != '' ? `<p>Persona(as) afectada: ${personaAfectada}</p>` : '' }
        
        ${usoArmas != '' ? `<p class="card-text">Uso de armas: ${usoArmas}</p>` : ''} 
        <br>
        <a href="/perfil" class="btn btn-primary">Mi Perfil</a>
      </div>
    </div>`
  );

}
