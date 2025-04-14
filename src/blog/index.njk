---
layout: layouts/base.njk
title: "Our Blog"
pagination:
  data: collections.blog
  size: 6
  alias: post
permalink: "/blog/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/index.html{% else %}index.html{% endif %}"
---

<section class="blog" style="padding: 2em; text-align: center;">
  <h1>Our Blog</h1>
  {% if pagination.items | length %}
    <!-- Use blog-cards as container -->
    <div class="blog-cards">
      {% for post in pagination.items %}
        <!-- Each post card uses blog-card class -->
        <div class="blog-card">
          <h2>
            <a href="{{ post.url }}" style="color: #800000; text-decoration: none;">
              {{ post.data.title | default("Untitled Post") }}
            </a>
          </h2>
          <p style="color: #666; font-size: 0.9em; margin: 0 0 0.5em;">
            {{ post.date | date("LLL dd, yyyy") }}
          </p>
          <p style="margin: 0 0 0.5em;">
            {{ post.data.excerpt | default(post.templateContent | safe | truncate(150, true)) }}
          </p>
          <a href="{{ post.url }}" class="btn" style="display: inline-block; margin-top: 0.5em;">Read More</a>
        </div>
      {% endfor %}
    </div>
    
    {% if pagination.pages.length > 1 %}
      <nav class="pagination" style="margin-top: 2em;">
        {% for page in pagination.pages %}
          {% if page.url %}
            <a href="{{ page.url }}" style="margin: 0 0.5em; text-decoration: none; color: #800000;">
              {{ page.pageNumber + 1 }}
            </a>
          {% endif %}
        {% endfor %}
      </nav>
    {% endif %}
    
  {% else %}
    <p>No blog posts found.</p>
  {% endif %}
</section>
