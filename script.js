function characterBuilder() {
  return {
    assets: {
      'Background': [
        'https://e1719e2a-268b-49a4-868c-99eb98ec37df.srvstatic.uz/Background/1%20(2).png',
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
    },
    randomize() {
      for (let layer in this.assets) {
        if (['Background', 'Back asset', 'Base'].includes(layer)) continue;
        if (this.assets[layer].length > 0) {
          this.selected[layer] = Math.random() > 0.5
            ? this.assets[layer][Math.floor(Math.random() * this.assets[layer].length)]
            : null;
        }
      }

      if (this.selected['Hair'] && this.selected['Asset']) {
        if (Math.random() > 0.5) this.selected['Hair'] = null;
        else this.selected['Asset'] = null;
      }
    },
    downloadImage() {
      html2canvas(document.getElementById('preview')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'character.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };
}
