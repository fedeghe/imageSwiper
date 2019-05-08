## imageSwiper

This is a simple utility to quickly enable a 'swipe diff image' like on github.  
All is needed is to load the library and then run
``` js
ImageSwiper({
    rangeSwipe: false, // add a range imput
    imageSwipe: true   // enable a dragging swiper on the image
});
```
this will act on all elements like the following:  
``` html
<div data-diff="media/delta1.png;media/delta2.png"></div>
```
here ‘media/delta1.png’ will be shown and swiping using the choosen mode You will see the ‘media/delta2.png’ appearing from the right.