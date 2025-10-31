from sqlalchemy import Column , Integer , String , DateTime 
from Database.db import Base 
class Room(Base) :
    __tablename__ = 'room'
    id = Column(Integer , primary_key=True , index=True)
    name = Column(String  , index=True)
    description = Column(String , nullable=True)
    

    