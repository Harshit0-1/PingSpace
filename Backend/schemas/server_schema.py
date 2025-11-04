from pydantic import BaseModel 

class ServerCreate(BaseModel) :
    name : str
    owner_id : int 


class ServerResponse(BaseModel) :
    id : int 
    name : str 
    owner_id : int
    class Config :
        orm_mode = True