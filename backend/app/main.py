from fastapi import FastAPI
from app.routes.convTemplate import router as update_convTemplate_route  # ✅ Correct import
from app.routes.botSettings import router as update_ai_bot_settings_route  # ✅ Correct import
app = FastAPI()
@app.get("/")
async def root():
    return {"message": "Welcome to the AI Bot API!"}
app.include_router(update_convTemplate_route, prefix="/auth/conversation-template", tags=["Conversations"])
app.include_router(update_ai_bot_settings_route, prefix="/auth/ai-bot", tags=["Bot_settings"])  # ✅ No error
   