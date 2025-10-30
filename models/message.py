from Database.db import Base 
from sqlalchemy import Column , Integer , String , DateTime
from datetime import datetime
class Message(Base) :
    id = Column(Integer , primary_key=True , index = True)
    sender = Column(String , nullable=False)
    room = Column(String , nullable=False)
    content = Column(String , nullable=False)
    timestamp = Column(DateTime , default=datetime.utcnow)