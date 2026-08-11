# 1. Base OS & Python Runtime
FROM python:3.13.0-slim

# 2. Environment Variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Working Directory
WORKDIR /app

# 4. Dependency Installation
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy Source Code
COPY . /app/

# 7. Expose Port
EXPOSE 8000

# 8. Execution Command (Dynamic Port Binding & Auto-Migration)
CMD ["sh", "-c", "python manage.py migrate && gunicorn drf_backend.wsgi:application --bind 0.0.0.0:${PORT:-8000} --timeout 120"]