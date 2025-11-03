import asyncio
import websockets

async def main():
    uri = "ws://127.0.0.1:8000/chat/ws/game/harshit"
    async with websockets.connect(uri) as ws:
        print("✅ Connected to the WebSocket!")
        await ws.send("Hello everyone!")
        while True:
            msg = await ws.recv()
            print("📩 Message:", msg)

asyncio.run(main())

#ws://127.0.0.1:8000/chat/ws/game/harshit
#ws://127.0.0.1:8000/chat/ws/gam/harshit
#ws://127.0.0.1:8000/chat/ws/game/rahul