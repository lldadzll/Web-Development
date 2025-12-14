// plant-animation.js - extra animations for Plant page

(function(){
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function playChime(){
    if (!audioCtx) audioCtx = new AudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 650;
    gain.gain.value = 0.0001;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    gain.gain.exponentialRampToValueAtTime(0.02, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
    osc.start(now);
    osc.stop(now + 0.9);
  }

  // Stamp
  const stamp = document.createElement('div');
  stamp.className = 'stamp';
  stamp.textContent = 'Planted Successfully 🌱';
  document.body.appendChild(stamp);

  // Water button
  const waterBtn = document.getElementById('waterBtn');
  if (waterBtn){
    waterBtn.addEventListener('click', ()=>{
      const w = document.createElement('div');
      w.className = 'water-effect';
      document.body.appendChild(w);
      setTimeout(()=> w.remove(), 900);
    });
  }

  // Night mode
  const nightToggle = document.getElementById('nightToggle');
  if (nightToggle){
    nightToggle.addEventListener('change',(e)=>{
      if (e.target.checked) document.body.classList.add('night');
      else document.body.classList.remove('night');
    });
  }

  // Sound toggle
  const soundToggle = document.getElementById('soundToggle');

  function playIfAllowed(){
    if (soundToggle && soundToggle.checked){
      try{ playChime(); }catch(e){}
    }
  }

  // Theme change depending on flower type
  const flowerSelect = document.getElementById('flower_type');
  function applyFlowerTheme(val){
    const body = document.body;
    body.classList.remove('theme-rose','theme-lavender','theme-sunflower','theme-mixed');
    if (val === 'Red Rose') body.classList.add('theme-rose');
    else if (val === 'Lavender') body.classList.add('theme-lavender');
    else if (val === 'Sunflower') body.classList.add('theme-sunflower');
    else if (val === 'Mixed Bouquet') body.classList.add('theme-mixed');
  }
  if (flowerSelect){
    applyFlowerTheme(flowerSelect.value);
    flowerSelect.addEventListener('change',(e)=> applyFlowerTheme(e.target.value));
  }

  // Plant random
  const plantRandom = document.getElementById('plantRandom');
  if (plantRandom && flowerSelect){
    plantRandom.addEventListener('click', ()=>{
      const types = ['Red Rose','Lavender','Sunflower','Mixed Bouquet'];
      const idx = Math.floor(Math.random()*types.length);
      flowerSelect.value = types[idx];
      applyFlowerTheme(flowerSelect.value);
      const seed = document.createElement('div');
      seed.className = 'seed-effect';
      document.body.appendChild(seed);
      setTimeout(()=> seed.remove(), 900);
    });
  }

  // Timeline + petals burst when planting succeeds
  window.onPlantSuccess = function(quantity){
    stamp.classList.add('show');
    setTimeout(()=> stamp.classList.remove('show'), 2500);

    playIfAllowed();

    const tl = document.getElementById('timeline');
    if (tl){
      tl.textContent = 'Seed → Sprout → Bloom ✨';
      tl.style.transform = 'scale(1.05)';
      setTimeout(()=> tl.style.transform = 'scale(1)', 1200);
    }

    const container = document.querySelector('.falling-petals');
    if (container){
      for (let i=0;i<6;i++){
        const p = document.createElement('div');
        p.className = 'petal';
        p.style.left = (20 + Math.random()*60) + '%';
        p.style.animationDuration = (2 + Math.random()*2) + 's';
        container.appendChild(p);
        setTimeout(()=> p.remove(), 4000);
      }
    }
  };
})();
