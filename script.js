function characterBuilder() {
  return {
    assets: {
      'Background': [
        'https://raw.githubusercontent.com/qasagava/Haties/refs/heads/main/assets/Background/1.png',
      ],
      'Back asset': [
        'https://raw.githubusercontent.com/qasagava/Haties/refs/heads/main/assets/Back%20asset/1.png',
      ],
      'Base': [
        'https://raw.githubusercontent.com/qasagava/Haties/refs/heads/main/assets/Base/1.png',
      ],
      'Clothes': [
        'https://raw.githubusercontent.com/qasagava/Haties/refs/heads/main/assets/Clothes/1.png',
      ],
      'Hair': [
        'https://raw.githubusercontent.com/qasagava/Haties/refs/heads/main/assets/Hair/1.png',
      ],
      'Asset': [
        'https://raw.githubusercontent.com/qasagava/Haties/refs/heads/main/assets/Asset/1.png',
      ],
      'Face': [
        'https://raw.githubusercontent.com/qasagava/Haties/refs/heads/main/assets/Face/1%20.png',
      ],
      'Hand': [
        'https://raw.githubusercontent.com/qasagava/Haties/refs/heads/main/assets/Hand/1.png',
      ]
    },

    layerOrder: [
      'Background', 'Back asset', 'Base', 'Clothes', 'Face', 'Hair', 'Asset', 'Hand'
    ],

    selected: {},
    activeCategory: null,
    isPanelVisible: false,

    init() {
      this.randomize();

      anime({
        targets: '.preview',
        opacity: [0, 1],
        scale: [0.9, 1],
        easing: 'easeOutExpo',
        duration: 800
      });
    },

   toggleCategory(layer) {
  if (this.activeCategory === layer) {
    this.isPanelVisible = false;
    setTimeout(() => {
      this.activeCategory = null;
    }, 1600); // должно совпадать с transition duration
  } else {
    this.activeCategory = layer;
    this.$nextTick(() => {
      this.isPanelVisible = true;
    });
  }
},


    select(layer, url) {
      if (layer === 'Hair') this.selected['Asset'] = null;
      if (layer === 'Asset') this.selected['Hair'] = null;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        this.selected[layer] = url;

        anime({
          targets: `#layer-${this.slugify(layer)}`,
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 600,
          easing: 'easeOutExpo'
        });
      };
    },

    randomize() {
      const alwaysPick = ['Background', 'Back asset', 'Base', 'Clothes', 'Face', 'Hand'];

      alwaysPick.forEach(layer => {
        const options = this.assets[layer];
        if (options?.length) {
          const randomIndex = Math.floor(Math.random() * options.length);
          this.selected[layer] = options[randomIndex];
        }
      });

      const useHair = Math.random() > 0.5;
      if (useHair) {
        this.selected['Hair'] = this.assets['Hair'][0];
        this.selected['Asset'] = null;
      } else {
        this.selected['Asset'] = this.assets['Asset'][0];
        this.selected['Hair'] = null;
      }

      anime({
        targets: '.preview img',
        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutCubic'
      });
    },

    downloadImage() {
      const node = document.getElementById('preview');
      html2canvas(node, {
        backgroundColor: null,
        useCORS: true,
        scale: 2
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'character.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    },

    slugify(str) {
      return str.toLowerCase().replace(/\s+/g, '-');
    }
  };
}


function preloader() {
    return {
      isVisible: true,
      init() {
        const images = document.images;
        let loaded = 0;
        const total = images.length;

        if (total === 0) {
          this.isVisible = false;
          return;
        }

        for (let i = 0; i < total; i++) {
          if (images[i].complete) {
            increment();
          } else {
            images[i].addEventListener('load', increment, false);
            images[i].addEventListener('error', increment, false);
          }
        }

        const that = this;
        function increment() {
          loaded++;
          if (loaded === total) {
            setTimeout(() => {
              that.isVisible = false;
            }, 500); // Задержка для красоты
          }
        }
      }
    };
  }