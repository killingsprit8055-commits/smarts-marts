# A2Z Mart - Deployment Guide

## Deployment Checklist

### Pre-Deployment
- [ ] All environment variables set
- [ ] Database backups created
- [ ] API keys validated
- [ ] SSL certificates obtained
- [ ] Domain name configured

### Backend Deployment Options

#### Option 1: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create a2z-mart-api
git push heroku main
heroku config:set MONGODB_URI=<your_mongodb_url>
heroku config:set JWT_SECRET=<your_secret>
heroku config:set RAZORPAY_KEY_ID=<key_id>
heroku config:set RAZORPAY_KEY_SECRET=<key_secret>
heroku config:set TWILIO_ACCOUNT_SID=<sid>
heroku config:set TWILIO_AUTH_TOKEN=<token>
heroku logs --tail
```

#### Option 2: AWS EC2
```bash
# Launch Ubuntu instance
ssh -i key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get install -y mongodb-org

# Clone and setup
git clone <your-repo>
cd a2z-mart/backend
npm install
cp .env.example .env
# Edit .env with production values
npm run dev
```

#### Option 3: DigitalOcean
```bash
# Create droplet
# SSH into droplet
ssh root@your-droplet-ip

# Follow AWS EC2 setup above
# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name "a2z-mart-api"
pm2 save
pm2 startup
```

### Frontend Deployment Options

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
REACT_APP_API_URL=<your-backend-url>
REACT_APP_RAZORPAY_KEY_ID=<key_id>
```

#### Option 2: Netlify
```bash
npm install -g netlify-cli
cd frontend
netlify deploy --prod
```

#### Option 3: AWS Amplify
```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

### Database Deployment

#### MongoDB Atlas (Recommended)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in backend .env

#### AWS RDS (If using different DB)
- Create RDS instance
- Configure security groups
- Get endpoint
- Update connection string

## Production Environment Variables

Backend `.env` for production:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=<production-mongodb-url>

RAZORPAY_KEY_ID=<production-key>
RAZORPAY_KEY_SECRET=<production-secret>
UPI_ID=hemanthraj15066@okaxis

TWILIO_ACCOUNT_SID=<production-sid>
TWILIO_AUTH_TOKEN=<production-token>
TWILIO_WHATSAPP_NUMBER=+1234567890
OWNER_WHATSAPP=+917794084986

JWT_SECRET=<long-random-string>
```

## SSL/HTTPS Setup

### Using Let's Encrypt (for self-hosted)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d yourdomain.com
```

### Using Cloudflare
1. Point DNS to Cloudflare
2. Enable Full SSL
3. Get certificate

## Performance Optimization

### Backend
- Enable compression: `app.use(compression())`
- Set up Redis caching
- Use CDN for static files
- Implement rate limiting

### Frontend
- Enable gzip compression
- Minify CSS/JS
- Lazy load images
- Use service workers

## Monitoring & Logging

### Backend Monitoring
```bash
npm install winston
npm install sentry
# Configure Winston/Sentry for error tracking
```

### Frontend Monitoring
```bash
npm install @sentry/react
# Setup Sentry for frontend errors
```

## Continuous Integration/Deployment

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "a2z-mart-api"
          heroku_email: ${{secrets.HEROKU_EMAIL}}
```

## Security Best Practices

- [ ] Enable HTTPS/SSL
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add CORS restrictions
- [ ] Validate all inputs
- [ ] Use prepared statements (MongoDB)
- [ ] Implement API authentication
- [ ] Set security headers
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Rollback Plan

```bash
# If deployment fails
git revert <commit-hash>
git push heroku main
# Or
pm2 restart a2z-mart-api
```

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify payment processing
- [ ] Test WhatsApp notifications
- [ ] Check database backups
- [ ] Monitor error logs
- [ ] Test user registration
- [ ] Verify file uploads
- [ ] Check response times
- [ ] Test on mobile devices
- [ ] Monitor server resources

## Domain Configuration

### DNS Setup
```
A record: your-api.com -> your-server-ip
A record: api.your-domain.com -> your-api-server-ip
CNAME: www.your-domain.com -> your-cdn-domain
```

### CORS Configuration
```javascript
// In backend
app.use(cors({
  origin: ['https://yourdomain.com', 'https://api.yourdomain.com'],
  credentials: true
}));
```

## Scaling Considerations

- Use load balancer (Nginx, HAProxy)
- Implement database replication
- Set up caching layer (Redis)
- Use message queues (RabbitMQ, Kafka)
- Implement horizontal scaling
- Use containerization (Docker)
- Orchestration (Kubernetes)

## Backup Strategy

```bash
# MongoDB backup
mongodump --uri mongodb+srv://username:password@cluster.mongodb.net/a2z-mart

# Restore
mongorestore --uri mongodb+srv://username:password@cluster.mongodb.net --archive

# Automated backup script (cron)
0 2 * * * /home/user/backup.sh
```

---

For production support, contact your hosting provider or DevOps team.
