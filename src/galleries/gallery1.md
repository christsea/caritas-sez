---
layout: layouts/base.njk
title: "Community Event Gallery"
thumbnail: "/images/uploads/community-event-thumb.jpg"
images:
  - image: "/images/uploads/community-event1.jpg"
  - image: "/images/uploads/community-event2.jpg"
  - image: "/images/uploads/community-event3.jpg"
  - image: "/images/uploads/community-event4.jpg"
  - image: "/images/uploads/community-event5.jpg"
  - image: "/images/uploads/community-event6.jpg"
  - image: "/images/uploads/community-event7.jpg"
---

<section class="gallery-detail py-5">
  <div class="container text-center">
    <h1 class="mb-4">{{ title }}</h1>
    <div id="lightgallery" class="row g-3 justify-content-center">
      {% if images %}
        {% for item in images %}
          <div class="col-md-3">
            <a href="{{ item.image }}" class="d-block">
              <img src="{{ item.image }}" alt="{{ title }} Image" class="img-fluid rounded">
            </a>
          </div>
        {% endfor %}
      {% else %}
        <p>No images available for this gallery.</p>
      {% endif %}
    </div>
  </div>
</section>

<!-- LightGallery CSS and JS (Free Build) -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/lightgallery@2.1.8/css/lightgallery.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/lightgallery@2.1.8/lightgallery.min.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    const galleryElement = document.getElementById("lightgallery");
    if (galleryElement) {
      lightGallery(galleryElement, { selector: 'a' });
    }
  });
</script>
