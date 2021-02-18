const timePublishIncident = document.querySelector('#timePublishIncident')

timePublishIncident.textContent = moment(new Date(timePublishIncident.textContent), "YYYYMMDD").fromNow()

