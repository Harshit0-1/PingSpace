from pydantic import BaseModel
class CreateServerUser(BaseModel):
    server_id : str
    user_id : str 
    role : str


class ServerUserResponse(BaseModel) :
    server_id : str 
    user_id : str
    role : str 

    class Config :
        orm_mode = True