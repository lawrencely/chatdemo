class ChatController < WebsocketRails::BaseController
	def initialize_session
	end 

	def new_client
		msg = {
			msg: 'client connected'
		}
		broadcast_message :new_client, msg 
	end

	def new_msg
		broadcast_message :new_message, message 
	end

	def room_msg
		room = message[:room]
		puts room
		WebsocketRails[room].trigger(:new_message_room, message)
	end  
end 