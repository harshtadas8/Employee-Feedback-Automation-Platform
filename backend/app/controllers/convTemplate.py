from app.database.supabase import supabase
from uuid import UUID

def  get_convTemplate(conv_id: UUID):
    if conv_id:
        print("Received conversation_id in controllers :", conv_id)
        response = (
        supabase.table("conversation_templates")
        .select("*")
        .eq("id", str(conv_id))  # Ensure UUID is a string
        .execute())
        print("Response from Supabase:", response)
        if response.model_dump().get("error"):
            return {"error": response["error"]}
        
        return {
        "message": "Conversation-template retrieved successfully",
        "data": response.data[0],  # Return the first record
        }
    else:
        # Fetch all templates
        response = supabase.table("conversation_templates").select("*").execute()
        print("Response from Supabase:", response)
        if response.model_dump().get("error"):
            return {"error": response["error"]}
        return {
            "message": "All conversation templates retrieved successfully",
            "data": response.data
        }  

def update_convTemplate(conversation_id: UUID, data: dict):
    update_data = data  # No need to re-parse as Pydantic model

    print("Fields to update:", update_data)

    response = (
        supabase.table("conversation_templates")
        .update(update_data)
        .eq("id", str(conversation_id))  # Ensure UUID is a string
        .execute()
    )

    print("Response from Supabase:", response)
    if response.model_dump().get("error"):
        return {"error": response["error"]}

    return {"message": "Conversation updated successfully", }


def add_convTemplate( data: dict):
    # Assuming data is a dictionary containing the conversation template details
    response = (
        supabase.table("conversation_templates")
        .insert(data)
        .execute()
    )

    print("Response from Supabase:", response)
    if response.model_dump().get("error"):
        return {"error": response["error"]}

    return {"message": "Conversation added successfully", "data" : response.data }


def delete_convTemplate(conversation_id: UUID):
    response = (
        supabase.table("conversation_templates")
        .delete()
        .eq("id", str(conversation_id))  # Ensure UUID is a string
        .execute()
    )

    print("Response from Supabase:", response)
    if response.model_dump().get("error"):
        return {"error": response["error"]}

    return {"message": "Conversation deleted successfully"}