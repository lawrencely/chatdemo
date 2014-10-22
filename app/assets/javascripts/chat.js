var dispatcher;
var room;
$(document).ready(function(){
	// create connection
	dispatcher = new WebSocketRails('localhost:3000/websocket');

	dispatcher.on_open = function(data) {
		// dispatcher.trigger('client_connected');
	}; 

	// bind functions to events from server
	dispatcher.bind('new_client', newMessage);
	dispatcher.bind('new_message', newMessage);

	// add event listeners 
	$('#send_message').on('click', sendMessage);
	$('#send_channel').on('click', sendChannel);
	$('#join_room').on('click', joinRoom);
});

// Functions called from server
var newMessage = function (msg) {
	var $newLine = $('<p>');
	$newLine.text(msg.msg);
	$(".chatlog").prepend($newLine);
};


// Functions sending to server
var sendMessage = function () {
	var msg = {
		msg: $('#message').val()
	};
	dispatcher.trigger('new_msg', msg);
};

var sendChannel = function () {
	var msg = {
		msg: $('#message').val(),
		room: 'room1'
	};
	dispatcher.trigger('room_msg', msg)
};

var joinRoom = function () {
	// sub to room
	room = dispatcher.subscribe('room1');

	// bind to room
	room.bind('new_message_room', newMessage);
};

// Other functions