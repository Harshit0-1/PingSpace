from pydantic import BaseModel
from typing import Optional
class RoomCreate(BaseModel) :
    name :str 
    description : Optional[str]
    server_id : str

class RoomResponse(BaseModel) :
    id : str 
    name : str 
    description : Optional[str]
    server_id : Optional[str]


    class Config:
        orm_mode = True