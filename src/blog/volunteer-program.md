---
layout: layouts/base.njk
title: "Volunteer Program"
date: 2025-05-06
tags: ["volunteer-program"]
excerpt: "Responding to the cause."
---

<section class="blog-category" style="padding: 2em; text-align: center;">
  <h1>Volunteer Program</h1>
  {% set categoryPosts = collections.blog | byTag("volunteer-program") %}
  {% if categoryPosts | length %}
    <ul style="list-style: none; padding: 0; max-width: 800px; margin: 0 auto; text-align: left;">
      {% for post in categoryPosts %}
        <li style="margin-bottom: 1em; border-bottom: 1px solid #ddd; padding-bottom: 0.5em;">
          <a href="{{ post.url }}" style="color: #800000; text-decoration: none; font-weight: bold;">
            {{ post.data.title }}
          </a>
          <span class="post-date" style="color: #666; font-size: 0.9em;">
            – {{ post.date | date("LLL dd, yyyy") }}
          </span>
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p>No posts available for Volunteer Program.</p>
  {% endif %}
</section>
