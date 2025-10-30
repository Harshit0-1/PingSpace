from fastapi import APIRouter ,Depends , HTTPException , status , WebSocket , WebSocketDisconnect
from models.user import User
from Database.db import get_db 
from sqlalchemy.orm import Session
from schemas.user_schema import UserOut , UserResponse
from ws.connection_manager import ConnectionManager
router = APIRouter()
manager = ConnectionManager()
@router.get('/', response_model=list[UserResponse])
def get_all_user(db:Session = Depends(get_db)) :
    all_user = db.query(User).all()
    return all_user 

@router.delete('/{id}')
def delete_user(id ,  db:Session = Depends(get_db)) :
        get_user = db.query(User).filter(User.id == id ).first()
        if  get_user :
            db.delete(get_user)
            db.commit()
            return "user deleted successfully"
        else :
             return f'There is no user with this {id}'
@router.websocket('/ws/{room}/{username}')
async def chatSocket(websocket: WebSocket, room: str, username: str):

    await manager.connect(websocket , room)
    await manager.broadcast(room , f'{username} joined the {room}')
    try:
         while True :
              data = await websocket.receive_text()

              message = f'{username} : {data}'
              await manager.broadcast(room , message)
    except WebSocketDisconnect :
         manager.disconnect(websocket  ,room)
         message = f'{username} left the chat'
         await manager.broadcast(room , message)