const chatListContainer = $('#mCSB_1')
const inputTextMessage = document.querySelector('#inputTextMessage')
const btnSendMessage = document.querySelector('#btnSendMessage')

btnSendMessage.addEventListener('click', function () {
  drawMessage()
})

$("#inputTextMessage").keypress(function (e) {
  if (e.keyCode != 13) return;
  drawMessage()
  return false
})

const getUserAuth = async function () {
  let url = '/valle-verde/api/auth/user'
  const data = await fetch(url)
  const user = data.json()
  return user
}

function drawMessage () {
  var msg = $("#inputTextMessage").val().replace(/\n/g, "");
  if (msg != '' && msg != ' ' && msg != undefined) {
    let socket = io('https://incident-web.herokuapp.com', { 'forceNew': true })
    //let socket = io('http://localhost:5000', { 'forceNew': true })
    socket.on('connect', async function () {
      const user = await getUserAuth()

      socket.emit('data', {
        success: '3',
        response: {
          message: msg,
          user: user
        }
      })
    })
    socket.on('disconnect', function () {})

    chatListContainer.append(`
      <div class="chat-msg">
          <p>${msg}</p>
          <span>${moment(new Date(), "YYYYMMDD").fromNow()}</span>
      </div>
    `)
    
    inputTextMessage.value = ''
  }
}
