const url = new URL(window.location.href)
const search = url.search
const searchParam = new URLSearchParams(search)
const q = searchParam.get('q')
console.log ('q +' + q)
