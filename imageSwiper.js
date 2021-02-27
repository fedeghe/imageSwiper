(function (W) {
    var WD = W.document;

    function appendImageCb(el, trg, cb) {
        var imgcnt = document.createElement('div'),
            img0 = new Image(),
            img1 = new Image(),
            stillLoading = 2;
        function ready() {
            stillLoading--;
            !stillLoading && cb();
        }
        function setImg(img, src, zIndex) {
            img.onload = ready;
            img.src = src;
            img.style.position = 'absolute';
            img.style.top = 0;
            img.style.left = 0;
            img.style.zIndex = zIndex;
            img.setAttribute('draggable', 'false');
            imgcnt.appendChild(img);
        }
        setImg(img0, el.image0src, 0);
        setImg(img1, el.image1src, 0);

        trg.style.position = 'relative';
        trg.appendChild(imgcnt);
        return img1;
    }

    function ImageSwiper(opts) {
        var self = this;
        this.opts = opts || {imageSwipe: true, rangeSwipe: true};
        this.els = [];
        this.range = null;
        this.separator = null;
        W.addEventListener('load', self.getItems.bind(self));
    }

    ImageSwiper.prototype.getItems = function () {
        var self = this,
            containers = WD.querySelectorAll('[data-imageswipe]'),
            howMany = containers.length;

        containers.forEach(function (container) {
            var images = container.dataset.imageswipe.split(';'),
                el = {
                    range: {value: 0},
                    separator: null,
                    container: null,
                    node: container,
                    image0src: images[0],
                    image1src: images[1]
                };

            el.mainImg = appendImageCb(el, el.node, function () {
                el.node.style.visibility = 'hidden';
                el.node.style.height = (el.mainImg.height + (self.opts.rangeSwipe ? 30 : 0)) + 'px';
                el.size = {
                    width: el.mainImg.width,
                    height: el.mainImg.height
                }
                el.mainImg.style.clip = 'rect(0, 0px, ' + el.mainImg.height + 'px, 0)';
                howMany--;
                if (howMany === 0) self.init();
            });
            el.container = el.mainImg.parentNode;
            container.removeAttribute('data-imageswipe')
            self.els.push(el);
        });
    };

    ImageSwiper.prototype.init = function () {
        var self = this;
        this.els.forEach(function (el) {
            el.node.style.visibility = 'visible';
            el.separator = document.createElement('div');
            el.separator.style.pointerEvents = 'none';
            el.separator.style.position = 'absolute';
            el.separator.style.width = 0;
            el.separator.style.border = '0.5px dashed rgba(0, 0, 0, .2)';

            el.separator.style.height = el.size.height + 'px';
            el.separator.style.top = '0px';

            function updateClip(value) {
                el.separator.style.opacity = 1;
                el.mainImg.style.clip = 'rect(0, ' + value + 'px, ' + el.size.height + 'px, 0)';
                el.separator.style.left = value + 'px';
                el.range.value = value;
                if (value < 2 || value > el.size.width -2) {
                    el.separator.style.opacity = 0
                }

            }
            function offsetUpdate(e, sliding) {
                var oX = Math.abs(e.offsetX)
                sliding && updateClip(oX)
            }
            function enableSliding() {
                el.container.style.cursor = 'ew-resize';
                el.sliding = true;
            }

            function disableSliding() {
                el.container.style.cursor = 'default';
                el.sliding = false;
            }

            if (self.opts.rangeSwipe) {
                el.range = document.createElement('input');
                el.range.type = 'range';
                el.range.style.padding = 0;
                el.range.style.margin = 0;
                el.range.style.marginTop = '5px';
                el.range.style.position = 'absolute';
                el.range.style.width = el.size.width + 'px';
                el.range.step = 1;
                el.range.min = 0;
                el.range.max = el.size.width;
                el.range.value = 0;
                el.range.style.top = el.size.height + 'px';

                el.node.appendChild(el.range)
                el.range.addEventListener('input', function () {
                    updateClip(this.value)
                });
            }

            if (self.opts.imageSwipe) {
                el.sliding = false;
                el.container.addEventListener('mousedown', enableSliding);
                el.container.addEventListener('mouseup', disableSliding);
                el.container.addEventListener('mouseleave', disableSliding);
                el.container.addEventListener('mousemove', function (e) {
                    offsetUpdate(e, el.sliding)
                });
                el.container.addEventListener('mousedown', function (e) {
                    offsetUpdate(e, true)
                });
            }
            el.node.appendChild(el.separator)
            
        });
    };
    W.ImageSwiper = function (opts) {
        new ImageSwiper(opts);
    };
})(this);