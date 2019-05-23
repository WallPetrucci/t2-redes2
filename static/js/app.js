
$(document).ready(function () {
    let socket = io.connect(`http://${document.domain}:${location.port}`);
    let btn = $('#btn_send_message');
    let mess = $('#message_user');
    let user_name = $('#user_name');

    socket.on('connect', function () {
        socket.emit('join', {})
    });

    btn.on('click', function () {
        socket.emit('send_msg', { name: user_name.val(), msg: mess.val() });
        mess.val('');
    })

    socket.on('response_event', function (response) {
        let content = $('#content');
        if (response.name == user_name.val()) {
            content.append(`<div class='my_msg'><div class='inner-content'><div class='content-name'>${response.name} : </div> <div class='content-msg'>${response.msg}</div></div></div>`)
            content.prop("scrollTop", content.prop("scrollHeight"));
        } else {
            content.append(`<div class='users_msg'><div class='inner-content'><div class='content-name'>${response.name} : </div> <div class='content-msg'>${response.msg}</div ></div ></div > `)
            content.prop("scrollTop", content.prop("scrollHeight"));
        }
    })

});