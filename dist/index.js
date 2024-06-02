'use strict';
/*
imageswipe v. 1.0.0
fedeghe <fedeghe@gmail.com>
~2.71KB
*/
!function(e){function t(e,t,n){function i(){!--l&&n()}function a(e,t,n){e.onload=i,e.src=t,e.style.position="absolute",e.style.top=0,e.style.left=0,e.style.zIndex=n,e.setAttribute("draggable","false"),s.appendChild(e)}var s=document.createElement("div"),r=new Image,o=new Image,l=2;return a(r,e.image0src,0),a(o,e.image1src,0),t.style.position="relative",t.appendChild(s),o}function n(t){var n=this;this.opts=t||{imageSwipe:!0,rangeSwipe:!0},this.els=[],this.range=null,this.separator=null,e.addEventListener("load",n.getItems.bind(n))}var i=e.document;n.prototype.getItems=function(){var e=this,n=i.querySelectorAll("[data-imageswipe]"),a=n.length;n.forEach(function(n){var i=n.dataset.imageswipe.split(";"),s={range:{value:0},separator:null,container:null,node:n,image0src:i[0],image1src:i[1]};s.mainImg=t(s,s.node,function(){s.node.style.visibility="hidden",s.node.style.height=s.mainImg.height+(e.opts.rangeSwipe?30:0)+"px",s.size={width:s.mainImg.width,height:s.mainImg.height},s.mainImg.style.clip="rect(0, 0px, "+s.mainImg.height+"px, 0)",0===--a&&e.init()}),s.container=s.mainImg.parentNode,n.removeAttribute("data-imageswipe"),e.els.push(s)})},n.prototype.init=function(){var e=this;this.els.forEach(function(t){function n(e){t.separator.style.opacity=1,t.mainImg.style.clip="rect(0, "+e+"px, "+t.size.height+"px, 0)",t.separator.style.left=e+"px",t.range.value=e,(e<2||e>t.size.width-2)&&(t.separator.style.opacity=0)}function i(e,t){var i=Math.abs(e.offsetX);t&&n(i)}function a(){t.container.style.cursor="ew-resize",t.sliding=!0}function s(){t.container.style.cursor="default",t.sliding=!1}t.node.style.visibility="visible",t.separator=document.createElement("div"),t.separator.style.pointerEvents="none",t.separator.style.position="absolute",t.separator.style.width=0,t.separator.style.border="0.5px dashed rgba(0, 0, 0, .2)",t.separator.style.height=t.size.height+"px",t.separator.style.top="0px",e.opts.rangeSwipe&&(t.range=document.createElement("input"),t.range.type="range",t.range.style.padding=0,t.range.style.margin=0,t.range.style.marginTop="5px",t.range.style.position="absolute",t.range.style.width=t.size.width+"px",t.range.step=1,t.range.min=0,t.range.max=t.size.width,t.range.value=0,t.range.style.top=t.size.height+"px",t.node.appendChild(t.range),t.range.addEventListener("input",function(){n(this.value)})),e.opts.imageSwipe&&(t.sliding=!1,t.container.addEventListener("mousedown",a),t.container.addEventListener("mouseup",s),t.container.addEventListener("mouseleave",s),t.container.addEventListener("mousemove",function(e){i(e,t.sliding)}),t.container.addEventListener("mousedown",function(e){i(e,!0)})),t.node.appendChild(t.separator)})},e.ImageSwiper=function(e){new n(e)}}(this);