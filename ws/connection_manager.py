from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.rooms = {}  # {room_name: [WebSocket, WebSocket]}
        self.online = {} # {game : [harshit , rahul ]}

    async def connect(self, websocket: WebSocket, room: str , username:str):
        await websocket.accept()
        if room not in self.rooms:
            self.rooms[room] = []
            self.online[room] = []
        self.rooms[room].append(websocket)
        if username not in self.online[room] :
            self.online[room].append(username)
        print(f'{username} connect to {room}' )
        print('room : ',self.online)
        
    


    def disconnect(self, websocket: WebSocket, room: str):
        if room in self.rooms:
            # self.rooms[room].remove(websocket)
            # if not self.rooms[room]:
            #     del self.rooms[room]
            pass
    async def broadcast(self, room: str, message: str ):
    
        if room in self.rooms:

            for connection in self.rooms[room]:
                await connection.send_text(message)

    def get_all_the_rooms(self):
        return self.rooms
    def check_new(self, room: str, username: str):
        return room not in self.online or username not in self.online[room]

        

manager = ConnectionManager()
