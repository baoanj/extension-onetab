chrome.contextMenus.create(
  {
    type: 'normal',
    title: 'Onetab',
    id: 'oneTabCur',
    contexts: ['all']
  },
  function () {
    console.log(arguments)
  }
)

chrome.contextMenus.onClicked.addListener(genericOnClick)

async function genericOnClick(info, tab) {
  console.log(info, tab)
  const menuItemId = info.menuItemId
  const title = tab.title
  const url = tab.url
  const ico = tab.favIconUrl
  const tabId = tab.id
  const today = new Date()
  const data = [
    {
      title,
      url,
      ico,
      date: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
    }
  ]

  if (menuItemId === 'oneTabCur') {
    chrome.storage.local.get('onetab', function (res) {
      let temp = res.onetab || []
      temp = temp.filter(f => !data.find(d => d.url === f.url))
      chrome.storage.local.set(
        { onetab: data.concat(temp) },
        function () {
          console.log(data)
          chrome.runtime.openOptionsPage()
          chrome.tabs.remove(tabId)
        }
      )
    })
  }
}
