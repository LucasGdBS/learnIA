from decouple import config as env

class Settings:
    ALLOW_HOSTS = env("ALLOW_HOSTS", default="http://localhost:5173", cast=lambda v: [s.strip() for s in v.split(',')])