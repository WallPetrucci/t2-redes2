from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

SALA = 'sala'


@socketio.on('join')
def joined(data):
    join_room(SALA)


@socketio.on('send_msg')
def handle_message(data, methods=['GET', 'POST']):
    data['msg'] = data['msg'].encode('latin-1').decode('utf-8')
    emit("response_event", data, room=SALA)


@app.route("/")
def root():
    return render_template('index.html')


if __name__ == '__main__':
    socketio.run(app)
