from Database.db import Base
from sqlalchemy import Integer , String , ForeignKey , Column 
class ServerUser(Base) :
    __tablename__ = 'server_user'
    server_id = Column(Integer ,ForeignKey('server.id') ,  primary_key=True)
    user_id = Column(Integer , ForeignKey('user.id')  , primary_key=True)
    role = Column(String)