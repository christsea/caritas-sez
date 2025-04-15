---
layout: layouts/post.njk
title: "Impact Stories"
---

<section class="blog-category" style="padding: 2em; text-align: center;">
  <h1>Impact Stories</h1>
  {% set impactPosts = collections.blog | byTag("impact-stories") %}
  {% if impactPosts | length %}
    <ul style="list-style: none; padding: 0; max-width: 800px; margin: 0 auto; text-align: left;">
      {% for post in impactPosts %}
        <li style="margin-bottom: 1em; border-bottom: 1px solid #ddd; padding-bottom: 0.5em;">
          <a href="{{ post.url }}" style="color: #800000; text-decoration: none; font-weight: bold;">
            {{ post.data.title }}
          </a>
          <span style="color: #666; font-size: 0.9em;">– {{ post.date | date("LLL dd, yyyy") }}</span>
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p>No posts available for Impact Stories.</p>
  {% endif %}
</section>
