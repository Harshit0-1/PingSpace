from Database.db import Base 
from sqlalchemy import Column , Integer , String , DateTime
from datetime import datetime
class Message(Base) :
    __tablename__ = 'message'
    id = Column(Integer , primary_key=True , index = True)
    sender = Column(String , nullable=False)
    room = Column(Integer , nullable=False)
    content = Column(String , nullable=False)
    timestamp = Column(DateTime , default=datetime.utcnow)