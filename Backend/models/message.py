from Database.db import Base 
from sqlalchemy import Column , Integer , String , DateTime
from datetime import datetime
import uuid
class Message(Base) :
    __tablename__ = 'message'
    id = Column(String , primary_key=True ,  default=lambda: str(uuid.uuid1()))
    sender = Column(String , nullable=False)
    room = Column(Integer , nullable=False)
    content = Column(String , nullable=False)
    timestamp = Column(DateTime , default=datetime.utcnow)