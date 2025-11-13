# Setting Up Secrets and Configuration

This project requires sensitive information that should NOT be committed to Git.

## Required Secrets

### 1. Database Connection Strings

Create `Site.Server/appsettings.Production.json` (this file is gitignored):

```json
{
  "ConnectionStrings": {
    "ClothUsers": "Server=YOUR_RDS_ENDPOINT,3306;Database=GotClothUsers;User Id=YOUR_USERNAME;Password=YOUR_PASSWORD;Encrypt=True;TrustServerCertificate=True;",
    "Carts": "Server=YOUR_RDS_ENDPOINT,3306;Database=Carts;User Id=YOUR_USERNAME;Password=YOUR_PASSWORD;Encrypt=True;TrustServerCertificate=True;"
  }
}
```

### 2. Google Custom Search API Key

Set the environment variable `GOOGLE_API_KEY` in your deployment environment (ECS task definition, etc.)

Or add to `appsettings.Production.json`:
```json
{
  "GoogleApi": {
    "Key": "YOUR_GOOGLE_API_KEY"
  }
}
```

### 3. AWS Credentials (if using S3)

Set via environment variables in your deployment:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`

## For ECS Deployment

Add these as environment variables in your ECS task definition:
- `GOOGLE_API_KEY` - Your Google Custom Search API key
- Connection strings can be set via environment variables or use AWS Secrets Manager

## Example appsettings.Production.json

See `appsettings.Production.json.example` for a template.

