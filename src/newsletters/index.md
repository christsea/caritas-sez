---
layout: layouts/base.njk
title: "Newsletters"
---

<section class="newsletters" style="padding: 2em; text-align: center;">
  <h1>Newsletters</h1>
  {% if collections.newsletters and collections.newsletters | length > 0 %}
    <ul style="list-style: none; padding: 0; margin: 0 auto; max-width: 600px;">
      {% for newsletter in collections.newsletters %}
        <li style="margin-bottom: 1.5em; border-bottom: 1px solid #ddd; padding-bottom: 1em;">
          <h3 style="margin: 0;">{{ newsletter.data.title | default("Untitled Newsletter") }}</h3>
          <p style="color: #666; font-size: 0.9em;">{{ newsletter.date | date("LLL dd, yyyy") }}</p>
          <p>{{ newsletter.data.excerpt | default("No excerpt provided.") }}</p>
          <a href="{{ newsletter.data.link }}" class="btn" style="display: inline-block; margin-top: 0.5em;">Download</a>
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p>No newsletters available at this time.</p>
  {% endif %}
</section>
