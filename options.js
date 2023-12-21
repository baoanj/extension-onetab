function render() {
  chrome.storage.local.get('onetab', function (res) {
    const list = res.onetab || []
    console.log(list)
    document.querySelector('#list').innerHTML = list
      .map(
        (m, i) =>
          `<div><button data-idx="${i}">删除</button> <span class="date">${
            m.date
          }</span> <img src="${m.ico || 'logo.png'}"/> <a href="${
            m.url
          }" target="_blank">${m.title}</a>${
            list.filter(f => f.title === m.title).length > 1
              ? ' <span class="url">' + m.url + '</span>'
              : ''
          }</div>`
      )
      .join('')
  })
}

render()

document.querySelector('#list').addEventListener('click', function (e) {
  if (e.target.nodeName === 'BUTTON') {
    delOne(+e.target.getAttribute('data-idx'))
  }
})

document.querySelector('#export').addEventListener('click', function () {
  chrome.storage.local.get('onetab', function (res) {
    const list = res.onetab || []
    document.querySelector('textarea').value = JSON.stringify(list)
    document.querySelector('textarea').style.display = 'inline'
  })
})

function delOne(i) {
  chrome.storage.local.get('onetab', function (res) {
    const list = res.onetab || []
    list.splice(i, 1)
    chrome.storage.local.set({ onetab: list }, function () {
      console.log(list)
      render()
    })
  })
}
