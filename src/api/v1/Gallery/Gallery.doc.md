# Gallery API Documentation

The Gallery module manages photo albums associated with events. It provides endpoints for creating galleries, fetching them, and managing individual images (add, update, delete) inside those galleries.

## Base URL
`/api/v1/gallery`

---

## Endpoints

### 1. Create a New Gallery
Creates a new gallery/album tied to a specific event.

* **URL:** `/create/newGallery`
* **Method:** `POST`
* **Auth Required:** Yes (Valid Access Token)
* **Permissions Required:** `CREATE_GALLERY`

**Request Body (JSON):**
```json
{
  "title": "DevFest 2024 Highlights",
  "description": "Photos from the main stage and networking sessions.",
  "EventName": "DevFest 2024",
  "albumImageUrl": "https://res.cloudinary.com/...",
  "tags": ["DevFest", "Networking"],
  "status": "published",
  "visibility": "public"
}
```

---

### 2. Get All Galleries
Fetches a paginated list of all galleries.

* **URL:** `/findAllGallery`
* **Method:** `GET`
* **Auth Required:** No

**Query Parameters:**
* `Page` (optional, default: 1)
* `Limit` (optional, default: 10)

---

### 3. Get Gallery By Slug
Fetches a specific gallery using its URL-friendly slug.

* **URL:** `/findGalleryBySlug/:Slug`
* **Method:** `GET`
* **Auth Required:** No

---

### 4. Add Image to Gallery
Appends a new image to an existing gallery's `images` array.

* **URL:** `/image`
* **Method:** `POST`
* **Auth Required:** Yes (Valid Access Token)

**Request Body (JSON):**
```json
{
  "galleryId": "65ab9c...",
  "imageDetails": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "cloudinary_public_id",
    "caption": "Opening Keynote",
    "featured": false
  }
}
```

---

### 5. Update Image in Gallery
Updates metadata (caption, featured status) of a specific image inside a gallery.

* **URL:** `/image`
* **Method:** `PATCH`
* **Auth Required:** Yes (Valid Access Token)

**Request Body (JSON):**
```json
{
  "galleryId": "65ab9c...",
  "imageUrl": "https://res.cloudinary.com/...",
  "updateData": {
    "caption": "Updated Keynote Caption",
    "featured": true
  }
}
```

---

### 6. Delete Image from Gallery
Removes an image from a gallery's `images` array.

* **URL:** `/image`
* **Method:** `DELETE`
* **Auth Required:** Yes (Valid Access Token)

**Request Body (JSON):**
```json
{
  "galleryId": "65ab9c...",
  "imageUrl": "https://res.cloudinary.com/..."
}
```
