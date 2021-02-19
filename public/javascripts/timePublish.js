const timePublishIncident = document.querySelector('#timePublishIncident')

timePublishIncident.textContent = moment(new Date(timePublishIncident.textContent)).format('MMMM Do YYYY, h:mm:ss a');
