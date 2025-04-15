---
layout: layouts/base.njk
title: "Community Outreach"
---

<section class="blog-category" style="padding: 2em; text-align: center;">
  <h1>Community Outreach</h1>
  {% set outreachPosts = collections.blog | byTag("community-outreach") %}
  {% if outreachPosts | length %}
    <ul style="list-style: none; padding: 0; max-width: 800px; margin: 0 auto; text-align: left;">
      {% for post in outreachPosts %}
        <li style="margin-bottom: 1em; border-bottom: 1px solid #ddd; padding-bottom: 0.5em;">
          <a href="{{ post.url }}" style="color: #800000; text-decoration: none; font-weight: bold;">
            {{ post.data.title }}
          </a>
          <span style="color: #666; font-size: 0.9em;">– {{ post.date | date("LLL dd, yyyy") }}</span>
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p>No posts available for Community Outreach.</p>
  {% endif %}
</section>
