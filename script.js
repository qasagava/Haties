function characterBuilder() {
  return {
    assets: {
      'Background': [
        'https://raw.githubusercontent.com/qasagava/Haties/refs/heads/main/1%20(2).png',
      ],
      'Back asset': [
        'https://e1719e2a-268b-49a4-868c-99eb98ec37df.srvstatic.uz/Back%20asset/1%20(1).png',
      ],
      'Base': [
        'https://e1719e2a-268b-49a4-868c-99eb98ec37df.srvstatic.uz/Base/1%20(3).png',
      ],
      'Clothes': [
        'https://e1719e2a-268b-49a4-868c-99eb98ec37df.srvstatic.uz/Clothes/1%20(4).png',
      ],
      'Hair': [
        'https://e1719e2a-268b-49a4-868c-99eb98ec37df.srvstatic.uz/Hair/1%20(6).png',
      ],
      'Asset': [
        'https://e1719e2a-268b-49a4-868c-99eb98ec37df.srvstatic.uz/Asset/1.png',
      ],
      'Face': [
        'https://e1719e2a-268b-49a4-868c-99eb98ec37df.srvstatic.uz/Face/1%20(5).png',
      ],
      'Hand': [
        'https://e1719e2a-268b-49a4-868c-99eb98ec37df.srvstatic.uz/Hand/1%20(7).png',
      ]
    },
    layerOrder: [
      'Background', 'Back asset', 'Base', 'Clothes', 'Face', 'Hand', 'Hair', 'Asset'
    ],
    selected: {},
    activeCategory: null,
    init() {
      this.selected = {
        'Background': this.assets['Background'][0],
        'Back asset': this.assets['Back asset'][0],
        'Base': this.assets['Base'][0],
        'Clothes': null,
        'Face': null,
        'Hand': null,
        'Hair': null,
        'Asset': null
      };

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

  this.selected[layer] = url;

  anime({
    targets: `#layer-${this.slugify(layer)}`,
    opacity: [0, 1],
    scale: [0.9, 1],
    duration: 600,
    easing: 'easeOutExpo'
  });
    },
    randomize() {
  for (let layer of this.layerOrder) {
    if (['Background', 'Back asset', 'Base'].includes(layer)) continue;

    const options = this.assets[layer];
    this.selected[layer] = Math.random() > 0.5 && options.length > 0
      ? options[Math.floor(Math.random() * options.length)]
      : null;
  }

  if (this.selected['Hair'] && this.selected['Asset']) {
    if (Math.random() > 0.5) this.selected['Hair'] = null;
    else this.selected['Asset'] = null;
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
    backgroundColor: null, // Чтобы не было белого фона
    useCORS: true,         // Важно для изображений с других доменов!
    scale: 2               // Лучше качество PNG
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'character.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
      });
    }
  };
}

