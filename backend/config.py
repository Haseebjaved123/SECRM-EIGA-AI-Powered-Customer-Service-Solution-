import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# OpenAI Configuration
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
OPENAI_MODEL = os.getenv('OPENAI_MODEL', 'gpt-3.5-turbo')
OPENAI_TEMPERATURE = float(os.getenv('OPENAI_TEMPERATURE', '0.7'))

# Fallback to demo mode if no API key
DEMO_MODE = not bool(OPENAI_API_KEY)

# SECRM-EIGA Configuration
MAX_RESPONSE_LENGTH = 500
DEFAULT_CONFIDENCE_THRESHOLD = 0.7
