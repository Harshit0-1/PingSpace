from sqlalchemy import Column , Integer , String , DateTime , ForeignKey
from Database.db import Base 
from sqlalchemy.orm import relationship
class Room(Base) :
    __tablename__ = 'room'
    id = Column(Integer , primary_key=True , index=True)
    name = Column(String  , index=True)
    description = Column(String , nullable=True)
    server_id = Column(Integer ,ForeignKey('server.id'))
    server = relationship('Server' , back_populates='room')
    