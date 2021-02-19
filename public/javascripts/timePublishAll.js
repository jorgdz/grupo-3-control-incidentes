const timePublishIncidents = document.querySelectorAll('.timePublishIncidents')

timePublishIncidents.forEach(elem => {
  elem.textContent = moment(new Date(elem.textContent), "YYYYMMDD").fromNow()
})