// src/admin/cms.js

// Wait until the page is parsed and any deferred scripts have loaded
document.addEventListener("DOMContentLoaded", () => {
  // Ensure the CMS core script actually ran and exposed window.CMS
  if (!window.CMS) {
    console.error(
      "🛑 Netlify CMS core not found – check your <script> include!"
    )
    return
  }

  // (Optional) Register any custom preview templates here
  // Example: simple JS-based preview for blog entries
  CMS.registerPreviewTemplate(
    "blog",
    function BlogPreview({ entry, widgetFor }) {
      const wrapper = document.createElement("div")
      wrapper.innerHTML = `
      <main class="container py-5">
        <h1>${entry.getIn(["data", "title"])}</h1>
        <p class="text-muted small">
          ${new Date(entry.getIn(["data", "date"])).toLocaleDateString()}
        </p>
        ${widgetFor("body")}
      </main>
    `
      return wrapper
    }
  )

  // (Optional) Register preview for single‐file pages collection
  CMS.registerPreviewTemplate(
    "pages",
    function PagePreview({ entry, widgetFor }) {
      const wrapper = document.createElement("div")
      wrapper.innerHTML = `
      <main class="container py-5">
        <h1>${entry.getIn(["data", "title"])}</h1>
        ${widgetFor("body")}
      </main>
    `
      return wrapper
    }
  )

  // Finally, kick off the CMS
  CMS.init()
})
