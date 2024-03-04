function render() {
  chrome.tabs.query({}, list => {
    document.querySelector('#list').innerHTML = list
      .map(
        m =>
          `<div><button data-tabid="${m.id}">收起</button> <img src="${
            m.favIconUrl || 'logo.png'
          }"/> <span>${m.title}</span></div>`
      )
      .join('')
  })
}

render()

document.querySelector('#list').addEventListener('click', function (e) {
  if (e.target.nodeName === 'BUTTON') {
    tabOne(+e.target.getAttribute('data-tabid'))
  }
})
function tabOne(id) {
  chrome.tabs.get(id, tab => {
    const title = tab.title
    const url = tab.url
    const ico = tab.favIconUrl
    const today = new Date()
    const data = [
      {
        title,
        url,
        ico,
        date: `${today.getFullYear()}/${
          today.getMonth() + 1
        }/${today.getDate()}`
      }
    ]
    chrome.storage.local.get('onetab', function (res) {
      let temp = res.onetab || []
      temp = temp.filter(f => !data.find(d => d.url === f.url))
      chrome.storage.local.set({ onetab: data.concat(temp) }, function () {
        console.log(data)
        chrome.tabs.remove(id)
        render()
      })
    })
  })
}

document.querySelector('#oneTab').addEventListener('click', oneTab)
function oneTab() {
  chrome.tabs.query({}, res => {
    const list = res
      .map(tab => {
        const title = tab.title
        const url = tab.url
        const ico = tab.favIconUrl
        const today = new Date()
        return {
          title,
          url,
          ico,
          date: `${today.getFullYear()}/${
            today.getMonth() + 1
          }/${today.getDate()}`
        }
      })
      .filter(f => f.url.indexOf('chrome-extension://') !== 0)
    chrome.storage.local.get('onetab', function (pon) {
      let temp = pon.onetab || []
      temp = temp.filter(f => !list.find(d => d.url === f.url))
      chrome.storage.local.set({ onetab: list.concat(temp) }, function () {
        console.log(list)
        chrome.runtime.openOptionsPage()
        chrome.tabs.remove(res.map(m => m.id))
      })
    })
  })
}

document.querySelector('#import').addEventListener('click', function () {
  const list = JSON.parse(document.querySelector('textarea').value)
  chrome.storage.local.get('onetab', function (pon) {
    let temp = pon.onetab || []
    temp = temp.filter(f => !list.find(d => d.url === f.url))
    chrome.storage.local.set({ onetab: list.concat(temp) }, function () {
      chrome.tabs.remove(res.map(m => m.id))
      chrome.runtime.openOptionsPage()
    })
  })
})
