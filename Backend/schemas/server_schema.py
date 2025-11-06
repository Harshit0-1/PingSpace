from pydantic import BaseModel 

class ServerCreate(BaseModel) :
    name : str
    owner_id : str 


class ServerResponse(BaseModel) :
    id : str 
    name : str 
    owner_id : str
    class Config :
        orm_mode = True