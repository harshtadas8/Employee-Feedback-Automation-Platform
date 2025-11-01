from app.database.supabase import supabase
from app.models.convTemplate import ConvTemplateUpdate
from uuid import UUID

def update_botSettings(setting_id: UUID, data: dict):
    try:
        # Filter out fields with None values to update only the provided fields
        update_data = {key: value for key, value in data.items() if value is not None}

        if not update_data:
            return {"error": "No valid fields provided for update"}

        response = (
            supabase.table("ai_bot_settings")
            .update(update_data)
            .eq("id", str(setting_id))
            .execute()
        )

        if response.data:
            return {"message": "AI Bot Setting updated successfully", "data": response.data[0]}
        else:
            return {"error": "No record found with the given ID"}
            
    except Exception as e:
        return {"error": str(e)}
    
def get_botSettings(setting_id: UUID):
    try:
        if setting_id is None:
            response = supabase.table("ai_bot_settings").select("*").execute()
            if response.data:
                return {"message": "AI Bot Settings retrieved successfully", "data": response.data}
            else:
                return {"error": "No records found"}
        else:
            response = (
                supabase.table("ai_bot_settings")
                .select("*")
                .eq("id", str(setting_id))
                .execute()
            )

        if response.data:
            return {"message": "AI Bot Setting retrieved successfully", "data": response.data[0]}
        else:
            return {"error": "No record found with the given ID"}
            
    except Exception as e:
        return {"error": str(e)}