---
layout: layouts/base.njk
title: "Contact"
---

<!-- Hero Banner -->
<section class="hero" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/default-image.jpg') no-repeat center center/cover; min-height: 40vh; display: flex; align-items: center; justify-content: center; color: #fff;">
  <div class="hero-content">
    <h1>Contact Us</h1>
    <p class="hero-subtitle">Have questions? We're here to help</p>
  </div>
</section>

<!-- Contact Information -->
<div class="contact-form-container">
  <h2 class="form-title">Send us a Message</h2>
  <form class="ultra-compact-form">
    <input type="text" placeholder="Your Name" aria-label="Your Name" required>
    <input type="email" placeholder="Your Email" aria-label="Your Email" required>
    <textarea placeholder="Your message here..." rows="4" aria-label="Your Message" required></textarea>
    <button type="submit">Send Message</button>
  </form>
</div>

<!-- Map Section -->
<section class="map-container">
  <h2>Our Location</h2>
  <div id="map"></div>
  <a href="https://www.openstreetmap.org/directions?to={{ site.address.coords[0] }},{{ site.address.coords[1] }}" target="_blank"
     class="map-directions-btn">
     Get Directions
  </a>
</section>
 <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<!-- Load Leaflet JS before your script -->
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<!-- Leaflet JS -->
 <script>
    document.addEventListener('DOMContentLoaded', function() {
      const coords = [{{ site.address.coords | safe }}];
      const map = L.map('map').setView(coords, 16); // Now L is defined
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);
      
      L.marker(coords).addTo(map)
        .bindPopup(`<b>{{ site.address.description }}<br/><b>{{ site.address.street }}</b><br/>{{ site.address.city }}`);
    });
  </script>
