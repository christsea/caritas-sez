---
layout: layouts/base.njk
title: "Contact"
---

<!-- Hero Banner -->
<!--
<section class="hero" style="background: url('/images/dummy-contact-hero.jpg') no-repeat center center/cover; padding: 4em 0; text-align: center; color: #fff;">
  <div class="hero-content">
    <h1>Contact Us</h1>
  </div>
</section>
-->

<!-- Contact Information & Map -->
<section class="contact-info" style="padding: 35% 0 4em 0; max-width: 800px; margin: 0 auto;">
  <h2>We'd Love to Hear From You</h2>
  <p>Send us an Email</p>
  
  <!-- Contact Form -->
  <form action="https://formspree.io/f/your-form-id" method="POST" style="display: flex; flex-direction: column; gap: 1em;">
    <input type="text" name="name" placeholder="Your Name" rows="10" required style="padding: 0.5em;">
    <input type="email" name="email" placeholder="Your Email" required style="padding: 0.5em;">
    <textarea name="message" placeholder="Your Message" required style="padding: 0.5em;"></textarea>
    <button type="submit" class="btn" style="background-color: #800000; color: #fff; padding: 0.75em 1.5em; border: none; border-radius: 4px;">Send Message</button>
  </form>
  <div style="padding: 3em">
  </div>
  <h2>Our Location</h2>
  <!-- Interactive Map -->
  <div id="map" style="height: 300px; margin: 1em 0;"></div>
</section>

<!-- Leaflet Map -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script>
  var map = L.map('map').setView([-4.628577, 55.455362], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
  }).addTo(map);
  L.marker([-4.628577, 55.455362]).addTo(map).bindPopup('Our Office Location').openPopup();
</script>
