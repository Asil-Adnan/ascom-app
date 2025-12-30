# Resuming Work on a New Machine

## 1. Clone the Repository
```bash
git clone https://github.com/Asil-Adnan/as-app.git
cd as-app
```

## 2. Install Dependencies
```bash
npm install
```

## 3. Environment Setup (Critical)
The `.env` file is NOT excluded from this backup (if it was added), but if it is missing, create a file named `.env` in the root directory and add the following content:

```env
DATABASE_URL="postgresql://neondb_owner:npg_3qz7nxlKasEX@ep-mute-art-agstpuoi-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

## 4. Run the Application
```bash
# Generate Prisma Client
npx prisma generate

# Run Development Server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Notes
- Login with: `user@demo.com` / OTP: `1234`
- Admin Login: `admin@demo.com` / OTP: `1234`
