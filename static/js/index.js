var oHTML = document.querySelector("html")
var aWidth = oHTML.clientWidth
//設計稿:375px
//默認字大小:16px
//隨著螢幕大小的改變，字體大小跟著改變
oHTML.style.fontSize = (aWidth / 375) *16 + "px"
