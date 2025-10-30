from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.rooms = {}  # {room_name: [WebSocket, WebSocket]}

    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.rooms:
            self.rooms[room] = []
        self.rooms[room].append(websocket)

    def disconnect(self, websocket: WebSocket, room: str):
        if room in self.rooms:
            self.rooms[room].remove(websocket)
            if not self.rooms[room]:
                del self.rooms[room]

    async def broadcast(self, room: str, message: str):
        if room in self.rooms:
            for connection in self.rooms[room]:
                await connection.send_text(message)

    def get_all_the_rooms(self):
        return self.rooms

manager = ConnectionManager()
