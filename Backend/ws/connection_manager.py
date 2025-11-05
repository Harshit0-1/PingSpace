from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.rooms = {}  # {room_name: [WebSocket, WebSocket]}
        self.online = {} # {game : [harshit , rahul ]}
        self.socket_to_username = {}  # {WebSocket: username}

    async def connect(self, websocket: WebSocket, room: str , username:str):
        await websocket.accept()
        if room not in self.rooms:
            self.rooms[room] = []
            self.online[room] = []
        self.rooms[room].append(websocket)
        if username not in self.online[room] :
            self.online[room].append(username)
        self.socket_to_username[websocket] = username
        print(f'{username} connect to {room}' )
        print('room : ',self.online)
        print(self.socket_to_username)
        print(self.rooms)
        
    
    def disconnect(self, websocket: WebSocket, room: str):
        username = self.socket_to_username.pop(websocket, None)
        if room in self.rooms and websocket in self.rooms[room]:
            self.rooms[room].remove(websocket)
        if username and room in self.online and username in self.online[room]:
            self.online[room].remove(username)
        if room in self.online:
            print(self.online[room])
    async def broadcast(self, room: str ,websocket,  message):
            print(websocket)
       
            if room in self.rooms:
                stale_connections = []
                # Iterate over a copy to avoid mutation during iteration
                print("all the members in rooms : " , list(self.rooms[room]))
                
                for connection in list(self.rooms[room]):
                    print("this are the username we are sending the message : " , self.socket_to_username[connection])
                    try:
                        # send structured payload (sender, content)
                        await connection.send_json(message)
                    except Exception:
                        stale_connections.append(connection)
                for connection in stale_connections:
                    try:
                        await connection.close()
                    except Exception:
                        pass
                    self.disconnect(connection, room)
    def get_all_the_rooms(self):
        return self.rooms
    def check_new(self, room: str, username: str):
        return room not in self.online or username not in self.online[room]

        

manager = ConnectionManager()
