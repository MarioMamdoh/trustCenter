# Multilingual Services API

This service supports both English and Arabic languages. All content fields (title, summary, content) are stored with both language versions.

## API Endpoints

### Get All Services

- **GET** `/api/services?lang=en` - Get all services in English
- **GET** `/api/services?lang=ar` - Get all services in Arabic
- **GET** `/api/services` - Default to English

### Get Single Service

- **GET** `/api/services/:id?lang=en` - Get service in English
- **GET** `/api/services/:id?lang=ar` - Get service in Arabic
- **GET** `/api/services/:id` - Default to English

### Create Service

- **POST** `/api/services`

Request body example:

```json
{
  "title": {
    "en": "Medical Consultation",
    "ar": "استشارة طبية"
  },
  "summary": {
    "en": "Professional medical consultation services",
    "ar": "خدمات استشارة طبية احترافية"
  },
  "content": {
    "en": "Our medical consultation service provides expert healthcare advice...",
    "ar": "تقدم خدمة الاستشارة الطبية لدينا نصائح صحية متخصصة..."
  },
  "image": "image-url-here"
}
```

### Update Service

- **PATCH** `/api/services/:id`

Same structure as create, but all fields are optional.

## Response Format

When requesting with `lang=en`:

```json
{
  "_id": "service-id",
  "title": "Medical Consultation",
  "summary": "Professional medical consultation services",
  "content": "Our medical consultation service provides expert healthcare advice...",
  "image": "image-url-here",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

When requesting with `lang=ar`:

```json
{
  "_id": "service-id",
  "title": "استشارة طبية",
  "summary": "خدمات استشارة طبية احترافية",
  "content": "تقدم خدمة الاستشارة الطبية لدينا نصائح صحية متخصصة...",
  "image": "image-url-here",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Supported Languages

- `en` - English
- `ar` - Arabic

## Error Handling

If an unsupported language is provided, the API will return a 400 Bad Request error with a message indicating the supported languages.
