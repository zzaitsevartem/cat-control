// ГосКотоКонтроль — базовый JS
(function(){
  // 1. Бургер-меню
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if(burger && nav){
    burger.addEventListener('click', ()=>{
      const open = nav.classList.toggle('show');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=> nav.classList.remove('show'));
    });
  }

  // 2. Слайдер галереи
  const track = document.getElementById('sliderTrack');
  const dotsWrap = document.getElementById('dots');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  let idx = 0;
  if(track){
    const slides = track.children.length;
    // точки
    for(let i=0;i<slides;i++){
      const d = document.createElement('button');
      d.setAttribute('aria-label','Фото '+(i+1));
      if(i===0) d.classList.add('active');
      d.addEventListener('click',()=>go(i));
      dotsWrap.appendChild(d);
    }
    const dots = dotsWrap.querySelectorAll('button');
    function go(i){
      idx = (i+slides)%slides;
      track.style.transform = 'translateX(-'+(idx*100)+'%)';
      dots.forEach((d,k)=>d.classList.toggle('active',k===idx));
    }
    prev.addEventListener('click',()=>go(idx-1));
    next.addEventListener('click',()=>go(idx+1));
    // свайп
    let sx=0;
    track.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
    track.addEventListener('touchend',e=>{
      const dx=e.changedTouches[0].clientX-sx;
      if(Math.abs(dx)>40) go(idx+(dx<0?1:-1));
    });
    // автопрокрутка каждые 6с, стоп при наведении
    let timer=setInterval(()=>go(idx+1),6000);
    document.getElementById('slider').addEventListener('mouseenter',()=>clearInterval(timer));
  }

  // 3. FAQ аккордеон
  document.querySelectorAll('.acc-item').forEach(item=>{
    const head=item.querySelector('.acc-head');
    head.addEventListener('click',()=>{
      const was=item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(o=>o.classList.remove('open'));
      if(!was) item.classList.add('open');
    });
  });

  // 4. Модалка
  const modal=document.getElementById('modal');
  const closeBtn=document.getElementById('modalClose');
  document.querySelectorAll('[data-open-modal]').forEach(b=>{
    b.addEventListener('click',()=>{
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    });
  });
  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }
  closeBtn.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

  // 5. Формы — только фронт-валидация, без отправки
  const form=document.getElementById('patrolForm');
  const msg=document.getElementById('formMsg');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const name=form.name.value.trim();
      const agree=document.getElementById('agree').checked;
      if(name.length<2){ msg.textContent='Придумай позывной от 2 букв, агент!'; return; }
      if(!agree){ msg.textContent='Поставь галочку согласия — у нас всё по согласию.'; return; }
      msg.textContent='Мяу! Заявка принята в штаб. Никуда не отправлено.';
      form.reset();
    });
  }
  const mform=document.getElementById('modalForm');
  const mmsg=document.getElementById('modalMsg');
  if(mform){
    mform.addEventListener('submit',e=>{
      e.preventDefault();
      const v=mform.mname.value.trim();
      if(v.length<2){ mmsg.textContent='Позывной слишком короткий.'; return; }
      mmsg.textContent='Добро пожаловать в Кошачий патруль, '+v+'!';
      mform.reset();
    });
  }

  console.log('%cГосКотоКонтроль на связи','font-weight:bold');
})();
