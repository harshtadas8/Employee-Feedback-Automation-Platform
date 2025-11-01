-- Create enums for various status fields
CREATE TYPE vibe_zone AS ENUM ('Frustrated', 'Sad', 'Okay', 'Happy', 'Excited');
CREATE TYPE sentiment_type AS ENUM ('positive', 'neutral', 'negative');
CREATE TYPE leave_type AS ENUM ('Annual', 'Sick', 'Personal', 'Bereavement', 'Other');
CREATE TYPE leave_status AS ENUM ('Approved', 'Pending', 'Rejected');
CREATE TYPE reward_type AS ENUM ('Bonus', 'Promotion', 'Award', 'Recognition');
CREATE TYPE employee_status AS ENUM ('active', 'onLeave', 'terminated');
CREATE TYPE sender_type AS ENUM ('employee', 'ai', 'bot');
CREATE TYPE employee_vibe_zone AS ENUM ('very_happy', 'happy', 'neutral', 'concerned', 'critical');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.settings.jwt_secret" TO 'your-jwt-secret';

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    department TEXT NOT NULL,
    position TEXT,
    title TEXT,
    location TEXT,
    tenure INTEGER,
    avatar_url TEXT,
    profile_image TEXT,
    manager TEXT,
    join_date TIMESTAMP WITH TIME ZONE,
    status employee_status DEFAULT 'active',
    vibe_score DECIMAL(4,2),
    last_vibe vibe_zone,
    vibe_zone employee_vibe_zone,
    last_contact TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vibe_responses table
CREATE TABLE IF NOT EXISTS vibe_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    score DECIMAL(4,2) NOT NULL,
    vibe_zone vibe_zone,
    feedback TEXT,
    sentiment sentiment_type,
    tags TEXT[],
    trigger_flags BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_data table
CREATE TABLE IF NOT EXISTS activity_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    hours_worked DECIMAL(5,2) NOT NULL,
    after_hours_work DECIMAL(5,2) NOT NULL,
    meetings_attended INTEGER NOT NULL,
    emails_sent INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leave_data table
CREATE TABLE IF NOT EXISTS leave_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    type leave_type NOT NULL,
    status leave_status DEFAULT 'Pending',
    days_count INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create performance_data table
CREATE TABLE IF NOT EXISTS performance_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
    feedback TEXT,
    goals TEXT[],
    strengths TEXT[],
    areas_for_improvement TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reward_data table
CREATE TABLE IF NOT EXISTS reward_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    type reward_type NOT NULL,
    description TEXT,
    amount DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create onboarding_data table
CREATE TABLE IF NOT EXISTS onboarding_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    satisfaction_rating SMALLINT CHECK (satisfaction_rating BETWEEN 1 AND 5),
    feedback TEXT,
    challenges TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    summary TEXT,
    sentiment sentiment_type,
    action_items TEXT[],
    requires_attention BOOLEAN DEFAULT FALSE,
    escalated BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_messages table
CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
    sender sender_type NOT NULL,
    text TEXT,
    content TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create metrics table for each employee
CREATE TABLE IF NOT EXISTS employee_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID UNIQUE REFERENCES employees(id) ON DELETE CASCADE,
    productivity DECIMAL(4,2) NOT NULL,
    satisfaction DECIMAL(4,2) NOT NULL,
    engagement DECIMAL(4,2) NOT NULL,
    retention DECIMAL(4,2) NOT NULL,
    development DECIMAL(4,2) NOT NULL,
    vibe_average DECIMAL(4,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_stats table for each employee
CREATE TABLE IF NOT EXISTS ai_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID UNIQUE REFERENCES employees(id) ON DELETE CASCADE,
    engagement_rate DECIMAL(4,2) NOT NULL,
    conversation_count INTEGER NOT NULL DEFAULT 0,
    average_response_time DECIMAL(10,2) NOT NULL,
    sentiment_score DECIMAL(4,2) NOT NULL,
    last_conversation_date TIMESTAMP WITH TIME ZONE,
    response_rate DECIMAL(4,2),
    avg_conversation_length DECIMAL(10,2),
    weekly_interactions INTEGER,
    actionable_feedback_rate DECIMAL(4,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employee_details table to store aggregate data
CREATE TABLE IF NOT EXISTS employee_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID UNIQUE REFERENCES employees(id) ON DELETE CASCADE,
    performance_score DECIMAL(4,2) NOT NULL,
    engagement_score DECIMAL(4,2) NOT NULL,
    reward_score DECIMAL(4,2) NOT NULL,
    workload_score DECIMAL(4,2) NOT NULL,
    leave_utilized_score DECIMAL(4,2) NOT NULL,
    strengths TEXT[],
    areas_for_improvement TEXT[],
    goals TEXT[],
    challenges TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table for application settings
CREATE TABLE IF NOT EXISTS app_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    admin_email TEXT NOT NULL,
    dark_mode BOOLEAN DEFAULT FALSE,
    email_notifications BOOLEAN DEFAULT TRUE,
    data_retention_period INTEGER DEFAULT 365,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE vibe_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for access control
-- Example policy for employees table - adapt for your authorization needs
CREATE POLICY "Public employees are viewable by everyone" ON employees
    FOR SELECT USING (true);

-- Create timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all tables with updated_at column
CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON employees
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_leave_data_updated_at
BEFORE UPDATE ON leave_data
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_employee_metrics_updated_at
BEFORE UPDATE ON employee_metrics
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ai_stats_updated_at
BEFORE UPDATE ON ai_stats
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_employee_details_updated_at
BEFORE UPDATE ON employee_details
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_app_settings_updated_at
BEFORE UPDATE ON app_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at(); 