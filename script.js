window.addEventListener('DOMContentLoaded', () => {
  anime.timeline({ easing: 'easeOutExpo' })
    .add({
      targets: '.container',
      opacity: [0, 1],
      translateY: ['3vw', '0vw'],
      duration: 1000,
    })
    .add({
      targets: '.headline',
      opacity: [0, 1],
      translateY: ['3vw', '0vw'],
      duration: 1200,
      delay: 200,
    }, '-=800')
    .add({
      targets: '.subtitle',
      opacity: [0, 1],
      translateY: ['2vw', '0vw'],
      duration: 1000,
      delay: 150,
    }, '-=1000');
});
