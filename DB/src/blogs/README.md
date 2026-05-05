# Multilingual Blogs API

This service supports both English and Arabic languages. All content fields (title, summary, content) are stored with both language versions.

## API Endpoints

### Get All Blogs

- **GET** `/api/blogs?lang=en` - Get all blogs in English
- **GET** `/api/blogs?lang=ar` - Get all blogs in Arabic
- **GET** `/api/blogs` - Default to English
- **GET** `/api/blogs?limit=10&page=1&lang=en` - Paginated results in English
- **GET** `/api/blogs?limit=10&page=1&lang=ar` - Paginated results in Arabic

### Get Single Blog

- **GET** `/api/blogs/:id?lang=en` - Get blog in English
- **GET** `/api/blogs/:id?lang=ar` - Get blog in Arabic
- **GET** `/api/blogs/:id` - Default to English

### Create Blog

- **POST** `/api/blogs`

Request body example:

```json
{
  "title": {
    "en": "Healthcare Tips for Winter",
    "ar": "نصائح صحية لفصل الشتاء"
  },
  "summary": {
    "en": "Essential healthcare tips to stay healthy during winter months",
    "ar": "نصائح صحية أساسية للبقاء بصحة جيدة خلال أشهر الشتاء"
  },
  "content": {
    "en": "Winter brings many health challenges. Here are some essential tips to stay healthy...",
    "ar": "يجلب الشتاء العديد من التحديات الصحية. إليك بعض النصائح الأساسية للبقاء بصحة جيدة..."
  },
  "image": "image-url-here"
}
```

### Update Blog

- **PATCH** `/api/blogs/:id`

Same structure as create, but all fields are optional.

### Increment Views

- **PATCH** `/api/blogs/:id/views` - Increment blog view count

## Response Format

When requesting with `lang=en`:

```json
{
  "_id": "blog-id",
  "title": "Healthcare Tips for Winter",
  "summary": "Essential healthcare tips to stay healthy during winter months",
  "content": "Winter brings many health challenges. Here are some essential tips to stay healthy...",
  "image": "image-url-here",
  "views": 150,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

When requesting with `lang=ar`:

```json
{
  "_id": "blog-id",
  "title": "نصائح صحية لفصل الشتاء",
  "summary": "نصائح صحية أساسية للبقاء بصحة جيدة خلال أشهر الشتاء",
  "content": "يجلب الشتاء العديد من التحديات الصحية. إليك بعض النصائح الأساسية للبقاء بصحة جيدة...",
  "image": "image-url-here",
  "views": 150,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Supported Languages

- `en` - English
- `ar` - Arabic

## Error Handling

If an unsupported language is provided, the API will return a 400 Bad Request error with a message indicating the supported languages.

## File Upload

- **POST** `/api/blogs/upload/:id` - Upload image for blog
- **DELETE** `/api/blogs/file/:id` - Delete file
- **PATCH** `/api/blogs/file/:fileId/:id` - Update file
