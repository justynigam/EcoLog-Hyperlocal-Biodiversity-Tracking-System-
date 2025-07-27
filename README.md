# EcoLog-Hyperlocal-Biodiversity-Tracking-System-
The platform's centralized database serves as a single source of truth, enabling real-time collaboration among researchers while maintaining rigorous data integrity through role-based access controls. This collaborative environment accelerates the research process by allowing simultaneous data entry.
A full-stack web application for recording and sharing ecological observations. This platform allows users to document wildlife sightings, track species, and contribute to citizen science efforts.

Features
📸 Upload photos of wildlife observations
📍 Automatic geolocation tagging
🔍 Browse and filter observations
📱 Responsive design for desktop and mobile
📊 Admin dashboard for content management
Tech Stack
Frontend
Next.js 14
TypeScript
Tailwind CSS
Shadcn UI components
React Hook Form
Zustand for state management
Backend
Django 5.2
Django REST Framework
SQLite (development) / PostgreSQL (production)
File-based image storage with Django's file handling
Prerequisites
Node.js 18+
Python 3.10+
pip (Python package manager)
Setup Instructions
1. Backend Setup
bash
# Navigate to backend directory
cd citizen-science-backend

# Create and activate virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (follow prompts)
python manage.py createsuperuser

# Run the development server
python manage.py runserver
2. Frontend Setup
bash
# Navigate to frontend directory
cd citizen-science-frontend

# Install Node.js dependencies
npm install

# Run the development server
npm run dev
3. Environment Variables
Create a .env.local file in the frontend directory:

bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
Project Structure
citizen-science/
├── backend/                  # Django backend
│   ├── core/                 # Django project settings
│   └── observations/         # Observations app
│       ├── models.py         # Database models
│       ├── serializers.py    # API serializers
│       ├── views.py          # API views
│       └── urls.py           # API endpoints
│
└── frontend/                 # Next.js frontend
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── pages/            # Application pages
    │   └── store/            # State management
    └── public/               # Static files
Available Scripts
Frontend
npm run dev - Start development server
npm run build - Build for production
npm start - Start production server
npm run lint - Run linter
Backend
python manage.py runserver - Start development server
python manage.py makemigrations - Create migrations
python manage.py migrate - Apply migrations
python manage.py createsuperuser - Create admin user
Contributing
Fork the repository
Create a new branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.
