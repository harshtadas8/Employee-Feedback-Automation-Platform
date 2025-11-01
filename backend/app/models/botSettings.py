from pydantic import BaseModel, Field
from typing import List, Optional, Literal, Annotated

class BotSettingsUpdate(BaseModel):
    bot_name: Optional[str] = None
    bot_enabled: Optional[bool] = None
    check_in_frequency: Optional[int] = None
    introduction_msg: Optional[str] = None
    ai_model: Optional[Literal['GPT-4', 'GPT-3.5 Turbo', 'Claude 3 Opus', 'Claude 3 Sonnet']] = None
    temperature: Optional[Annotated[float, Field(ge=0.0, le=1.0)]] = None
    auto_esc_critical_issue: Optional[bool] = None
    escalation_threshold: Optional[Annotated[int, Field(ge=1, le=5)]] = None
    hr_email_notification: Optional[bool] = None
    employee_opt_out: Optional[bool] = None
    manager_notification: Optional[bool] = None
    anonymize_data: Optional[bool] = None
    data_retension: Optional[str] = None
    system_prompts: Optional[str] = None
    features_enabled: Optional[List[str]] = None