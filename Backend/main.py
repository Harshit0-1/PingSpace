from fastapi import FastAPI
from Database.db import Base , engine

from Routers import chat , auth
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = [
    "http://192.168.200.130:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://pingspace-jmzl.onrender.com",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



Base.metadata.create_all(bind = engine)

app.include_router(chat.router , prefix = '/chat')
app.include_router(auth.router , prefix = '')