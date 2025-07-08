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

    // ✅ Hand — последний слой
    layerOrder: [
      'Background', 'Back asset', 'Base', 'Clothes', 'Face', 'Hair', 'Asset', 'Hand'
    ],

    selected: {},
    activeCategory: null,

    init() {
      this.randomize(); // 👉 при загрузке сразу генерация

      anime({
        targets: '.preview',
        opacity: [0, 1],
        scale: [0.9, 1],
        easing: 'easeOutExpo',
        duration: 800
      });
    },

    toggleCategory(layer) {
      this.activeCategory = this.activeCategory === layer ? null : layer;
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

      // Устанавливаем всегда 1 вариант из каждой обязательной категории
      alwaysPick.forEach(layer => {
        const options = this.assets[layer];
        if (options?.length) {
          const randomIndex = Math.floor(Math.random() * options.length);
          this.selected[layer] = options[randomIndex];
        }
      });

      // Hair или Asset (одно из двух)
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
