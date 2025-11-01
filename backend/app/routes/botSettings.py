from fastapi import APIRouter, HTTPException, Body
from app.controllers.botSettings import update_botSettings, get_botSettings
from app.models.botSettings import BotSettingsUpdate
from uuid import UUID
router = APIRouter()

@router.get("/get/all-settings")
async def get_all_bot_settings():
    """
    Get All AI Bot Settings
    """
    response = get_botSettings(None)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response

@router.get("/get/{setting_id}")
async def get_bot_settings(
    setting_id: UUID, 
):
    """
    Get AI Bot Settings
    """
    response = get_botSettings(setting_id)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response


@router.put("/update/{setting_id}")
async def update_bot_settings(
    setting_id: UUID, 
    data: BotSettingsUpdate 
    ):
    print("Received data:", data)
    """
    Update AI Bot Settings
    """
    print("Received data:", data)
    response = update_botSettings(setting_id, data.model_dump())
    print("Response from controller:", response)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response.error)
    return response
