from pydantic import BaseModel
from typing import Optional, Any

class APIResponse(BaseModel):
    error: Optional[str] = None
    data: Optional[Any] = None
