from pydantic import BaseModel
from typing import List, Optional

class ConvTemplateUpdate(BaseModel):
    category: Optional[str] = None
    trigger_keywords: Optional[List[str]] = None
    initial_message: Optional[str] = None
    questions: Optional[List[str]] = None

class ConvTemplateAdd(BaseModel):
    category: str
    trigger_keywords: List[str]
    initial_message: str
    questions: List[str]