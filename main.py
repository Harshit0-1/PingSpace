from fastapi import FastAPI
from Database.db import Base , engine

from Routers import chat , auth
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify like ["https://websocketking.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



Base.metadata.create_all(bind = engine)

app.include_router(chat.router , prefix = '/chat')
app.include_router(auth.router , prefix = '')