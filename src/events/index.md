---
layout: layouts/base.njk
title: "Events"
---

<section class="events" style="padding: 2em; max-width: 1200px; margin: 0 auto;">
  <h1 style="text-align: center;">Our Events</h1>
  <div class="events-grid" style="display: flex; flex-wrap: wrap; gap: 2em; justify-content: center; margin-top: 1em;">
    {% for event in collections.events %}
    <div class="event-card" style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden; flex: 1 1 300px; max-width: 320px;">
      {% if event.data.image %}
      <img src="{{ event.data.image }}" alt="{{ event.data.title }}" style="width: 100%; height: auto;">
      {% else %}
      <img src="/images/dummy-event.jpg" alt="Event Image" style="width: 100%; height: auto;">
      {% endif %}
      <div style="padding: 1em;">
        <h3>{{ event.data.title | default("Event Title") }}</h3>
        <p>{{ event.data.description | default("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.") | truncate(100, true) }}</p>
        <a href="{{ event.url }}" class="btn" style="background-color: #800000; color: #fff; padding: 0.5em 1em; text-decoration: none; border-radius: 4px;">Read More</a>
      </div>
    </div>
    {% endfor %}
  </div>
</section>
