if (location.origin === 'https://blog.csdn.net') {
  const oldEl = document.querySelector('.blog-content-box')
  if (oldEl) {
    const newEl = oldEl.cloneNode(true)
    oldEl.parentNode.replaceChild(newEl, oldEl)
  }
  const style = document.createElement('style')
  style.innerHTML = `
    #content_views pre {
      user-select: initial;
    }
    #content_views pre code {
      user-select: initial;
    }
  `
  document.head.appendChild(style)
}
