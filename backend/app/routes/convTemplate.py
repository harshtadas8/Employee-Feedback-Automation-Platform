from fastapi import APIRouter, HTTPException, Body
from app.controllers.convTemplate import  get_convTemplate, update_convTemplate, delete_convTemplate, add_convTemplate
from app.models.convTemplate import ConvTemplateUpdate, ConvTemplateAdd

from uuid import UUID
router = APIRouter()

@router.get("/get/all-templates")
async def get_all_conversations():
    """
    Get All Conversation Templates
    """
    response = get_convTemplate(None)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response

@router.get("/get/{conversation_id}")
async def get_conversation(
    conversation_id: UUID, 
):
    """
    Get Conversation Template
    """
    response = get_convTemplate(conversation_id)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response



@router.put("/update/{conversation_id}")
async def update_conversation(
    conversation_id: UUID, 
    data: ConvTemplateUpdate
):
    response = update_convTemplate(conversation_id, data.model_dump(exclude_unset=True))
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response

@router.delete("/delete/{conversation_id}")
async def delete_conversation(
    conversation_id: UUID
):
    response = delete_convTemplate(conversation_id)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response

@router.post("/add")
async def add_conversation(
    data: ConvTemplateAdd = Body(...)
):
    print("Received data:", data)
    response = add_convTemplate(data.model_dump(exclude={'conversation_id'}) )
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response