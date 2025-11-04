from pydantic import BaseModel
from typing import Optional

class UserOut(BaseModel):
    username: str
    password: str
    server :  Optional[int]

class UserResponse(BaseModel):
    id: int
    username: str
    server : int

    class Config:
        orm_mode = True