var filePictureUser = document.querySelector('#file_picture_user')
filePictureUser.addEventListener('change', function(event) {
  const endpoint = '/perfil/api/foto'
  var formData = new FormData()
  formData.append('file', event.target.files[0])

  fetch(endpoint, {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    var imgProfile = document.querySelectorAll('.img_profile')
    
    imgProfile.forEach(elem => {
      elem.src = response.url
    })
  })

}, false)
