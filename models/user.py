from Database.db import Base 
from sqlalchemy import Column , Integer , String

class User(Base) :
    __tablename__ = 'user'
    id = Column(Integer , index = True , primary_key=True )
    username = Column(String , unique = True , index = True)
    password = Column(String)