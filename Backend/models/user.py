# models/user.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from Database.db import Base

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password = Column(String)
    server = relationship("Server" , back_populates='owner')
