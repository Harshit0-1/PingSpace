from pydantic import BaseModel
class CreateServerUser(BaseModel):
    server_id : int
    user_id : int 
    role : str


class ServerUserResponse(BaseModel) :
    server_id : int 
    user_id : int 
    role : str 

    class Config :
        orm_mode = True