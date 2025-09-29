// Slider dos mais pedidos - JS profissional
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('produtosSlider');
  const left = document.getElementById('arrowLeft');
  const right = document.getElementById('arrowRight');
  let idx = 0;
  const total = slider?.children.length || 3;
  function updateSlider() {
    const cardWidth = slider?.children[0]?.offsetWidth || 260;
    const gap = 36;
    slider.style.transform = `translateX(${-idx*(cardWidth+gap)}px)`;
    left.disabled = idx === 0;
    right.disabled = idx === total-1;
  }
  left?.addEventListener('click',()=>{
    idx = Math.max(0, idx-1);
    updateSlider();
  });
  right?.addEventListener('click',()=>{
    idx = Math.min(total-1, idx+1);
    updateSlider();
  });
  window.addEventListener('resize', updateSlider);
  updateSlider();
});
// Slider dos mais vendidos
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('produtosSlider');
  const left = document.getElementById('arrowLeft');
  const right = document.getElementById('arrowRight');
  let idx = 0;
  const total = slider?.children.length || 3;
  function updateSlider() {
    const cardWidth = slider?.children[0]?.offsetWidth || 240;
    const gap = 36;
    slider.style.transform = `translateX(${-idx*(cardWidth+gap)}px)`;
    left.disabled = idx === 0;
    right.disabled = idx === total-1;
  }
  left?.addEventListener('click',()=>{
    idx = Math.max(0, idx-1);
    updateSlider();
  });
  right?.addEventListener('click',()=>{
    idx = Math.min(total-1, idx+1);
    updateSlider();
  });
  window.addEventListener('resize', updateSlider);
  updateSlider();
});
// Newsletter/cadastro de visitante
document.getElementById('newsletterForm')?.addEventListener('submit',function(e){
  e.preventDefault();
  const nome = document.getElementById('newsName').value.trim();
  const email = document.getElementById('newsEmail').value.trim();
  const whatsapp = document.getElementById('newsWhatsapp').value.trim();
  const pref = document.getElementById('newsPref').value;
  const seg = document.getElementById('newsSegment').value;
  // Simulação: salva no localStorage para segmentação
  let base = JSON.parse(localStorage.getItem('bordados_newsletter')||'[]');
  base.push({nome,email,whatsapp,pref,seg,date:new Date().toISOString()});
  localStorage.setItem('bordados_newsletter',JSON.stringify(base));
let msg = `Cadastro realizado! Em breve você receberá dicas, novidades e promoções.`;
if(pref==='email') msg += ' Fique atento ao seu e-mail!';
  document.getElementById('newsletterMsg').innerText = msg;
  document.getElementById('newsletterMsg').style.display = 'block';
  document.getElementById('newsletterForm').reset();
});
// Recuperação de pedido abandonado
function salvarProgressoWizard() {
  const campos = ['wizardType','wizardText','wizardColor','wizardQty','wizardName','wizardPhone','wizardEmail','wizardAddress','wizardPay','wizardObs'];
  let dados = {};
  campos.forEach(id=>{
    const el = document.getElementById(id);
    if(el) dados[id] = el.value;
  });
  localStorage.setItem('bordados_wizard', JSON.stringify(dados));
}
document.querySelectorAll('#wizardForm input, #wizardForm select, #wizardForm textarea').forEach(el=>{
  el.addEventListener('blur',salvarProgressoWizard);
  el.addEventListener('change',salvarProgressoWizard);
});
function verificarPedidoAbandonado() {
  const dados = localStorage.getItem('bordados_wizard');
  if(dados && !localStorage.getItem('bordados_wizard_finalizado')) {
    setTimeout(()=>{
      document.getElementById('recoverBanner').style.display = 'flex';
    }, 4000);
  }
}
function retomarPedidoWizard() {
  const dados = JSON.parse(localStorage.getItem('bordados_wizard')||'{}');
  Object.keys(dados).forEach(id=>{
    const el = document.getElementById(id);
    if(el && dados[id]) el.value = dados[id];
  });
  document.getElementById('recoverBanner').style.display = 'none';
  showStep(0);
}
function enviarLembreteWhatsapp() {
  const dados = JSON.parse(localStorage.getItem('bordados_wizard')||'{}');
  let msg = `Olá! Você esqueceu de finalizar seu pedido de bordado. Retome aqui e ganhe 5% de desconto!\n`;
  if(dados.wizardName) msg += `Nome: ${dados.wizardName}\n`;
  if(dados.wizardType) msg += `Produto: ${dados.wizardType}\n`;
  if(dados.wizardText) msg += `Personalização: ${dados.wizardText}\n`;
  if(dados.wizardQty) msg += `Qtd: ${dados.wizardQty}\n`;
  msg += `Cupom: PRIMEIRA5`;
  window.open(`https://wa.me/258848520196?text=${encodeURIComponent(msg)}`,'_blank');
}
document.getElementById('wizardForm')?.addEventListener('submit',function(){
  localStorage.setItem('bordados_wizard_finalizado','1');
  localStorage.removeItem('bordados_wizard');
});
verificarPedidoAbandonado();
// Compartilhamento social
function sharePortfolio(title) {
  const msg = `Veja essa inspiração de bordado: ${title} em Bordados & Delivery! ${location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank');
}
// Exibir banner pop-up após 8 segundos
setTimeout(()=>{
  document.getElementById('popupBanner').style.display = 'flex';
},8000);
// Modal com galeria, zoom e depoimento
function showPortfolioModalGallery(imgs, title, desc, badge, depo) {
  const modal = document.getElementById('portfolioModal');
  const content = document.getElementById('portfolioModalContent');
  let mainImg = imgs[0];
  let galleryHtml = `<div style='display:flex;gap:12px;justify-content:center;align-items:center;margin-bottom:12px;'>`;
  galleryHtml += `<img src='${mainImg}' id='portfolioMainImg' style='width:180px;height:110px;object-fit:cover;border-radius:12px;box-shadow:0 2px 8px #00336611;cursor:zoom-in;margin-right:10px;' onclick='zoomPortfolioImg("${mainImg}")'>`;
  imgs.slice(1).forEach((src,i)=>{
    galleryHtml += `<img src='${src}' alt='${title} ${i+2}' onclick='setPortfolioMainImg("${src}")' id='galleryImg${i+1}' style='width:110px;height:70px;object-fit:cover;border-radius:8px;box-shadow:0 2px 8px #00336611;cursor:pointer;'>`;
  });
  galleryHtml += `</div>`;
  content.innerHTML = `<button class='portfolio-modal-close' onclick='closePortfolioModal()'>&times;</button>`+
    (badge?`<span class='badge'>${badge}</span>`:'')+
    galleryHtml+
    `<h3 style='color:var(--primary);margin-bottom:8px;'>${title}</h3><div style='font-size:15px;color:#0f172a;'>${desc}</div>`+
    (depo?`<div class='portfolio-modal-depo'>${depo}</div>`:'');
  modal.classList.add('active');
}
function setPortfolioMainImg(src){
  document.getElementById('portfolioMainImg').src = src;
  document.querySelectorAll('.portfolio-modal-gallery img').forEach(img=>img.classList.remove('active'));
  Array.from(document.querySelectorAll('.portfolio-modal-gallery img')).find(img=>img.src===src).classList.add('active');
}
function zoomPortfolioImg(src){
  const win = window.open('', '_blank');
  win.document.write(`<img src='${src}' style='width:100%;max-width:900px;'>`);
}
// Preview e zoom acessível para upload de imagem no wizard
const wizardRef = document.getElementById('wizardRef');
const wizardPreview = document.getElementById('wizardPreview');
const zoomBtn = document.getElementById('zoomImg');
let wizardImgData = null;
wizardRef?.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      wizardImgData = evt.target.result;
      wizardPreview.innerHTML = `<img src='${wizardImgData}' alt='Preview' style='max-width:100px;max-height:60px;border-radius:6px;box-shadow:0 2px 8px #0001'>`;
      zoomBtn.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  } else {
    wizardPreview.textContent = 'Nenhuma imagem carregada';
    zoomBtn.style.display = 'none';
    wizardImgData = null;
  }
});
zoomBtn?.addEventListener('click', function() {
  if(wizardImgData){
    const win = window.open('', '_blank');
    win.document.write(`<img src='${wizardImgData}' style='width:100%;max-width:800px;'>`);
  }
});
// Auto-preenchimento básico para campos já utilizados
['wizardName','wizardPhone','wizardEmail','wizardAddress'].forEach(id=>{
  const el = document.getElementById(id);
  el?.addEventListener('blur',function(){
    if(el.value) localStorage.setItem('bordados_'+id,el.value);
  });
  el?.addEventListener('focus',function(){
    const val = localStorage.getItem('bordados_'+id);
    if(val && !el.value) el.value = val;
  });
});
// Wizard Formulário Progressivo
const steps = ["step1","step2","step3","step4","step5","step6"];
let currentStep = 0;
function showStep(idx) {
  steps.forEach((id,i)=>{
    document.getElementById(id).style.display = (i===idx)?'block':'none';
  });
}
showStep(currentStep);
document.getElementById('next1')?.addEventListener('click',()=>{showStep(1)});
document.getElementById('next2')?.addEventListener('click',()=>{showStep(2)});
document.getElementById('next3')?.addEventListener('click',()=>{showStep(3)});
document.getElementById('next4')?.addEventListener('click',()=>{showStep(4)});
document.getElementById('next5')?.addEventListener('click',()=>{showStep(5)});
document.getElementById('prev2')?.addEventListener('click',()=>{showStep(0)});
document.getElementById('prev3')?.addEventListener('click',()=>{showStep(1)});
document.getElementById('prev4')?.addEventListener('click',()=>{showStep(2)});
document.getElementById('prev5')?.addEventListener('click',()=>{showStep(3)});
document.getElementById('prev6')?.addEventListener('click',()=>{showStep(4)});
// Botões de quantidade
document.getElementById('plusQty')?.addEventListener('click',()=>{
  let qty = document.getElementById('wizardQty');
  qty.value = parseInt(qty.value||'1')+1;
});
document.getElementById('minusQty')?.addEventListener('click',()=>{
  let qty = document.getElementById('wizardQty');
  if(parseInt(qty.value)>1) qty.value = parseInt(qty.value)-1;
});
// Validação em tempo real
document.querySelectorAll('#wizardForm input, #wizardForm select, #wizardForm textarea').forEach(el=>{
  el.addEventListener('input',function(){
    if(el.checkValidity()){
      el.style.borderColor = 'var(--primary)';
    }else{
      el.style.borderColor = '#e63946';
    }
  });
});
// Envio do pedido (simulação via WhatsApp)
document.getElementById('wizardForm')?.addEventListener('submit',function(e){
  e.preventDefault();
  const nome = document.getElementById('wizardName').value;
  const tel = document.getElementById('wizardPhone').value;
  const email = document.getElementById('wizardEmail').value;
  const endereco = document.getElementById('wizardAddress').value;
  const tipo = document.getElementById('wizardType').value;
  const texto = document.getElementById('wizardText').value;
  const cor = document.getElementById('wizardColor').value;
  const qtd = document.getElementById('wizardQty').value;
  const pagamento = document.getElementById('wizardPay').value;
  const obs = document.getElementById('wizardObs').value;
  let msg = `Olá, ${nome}! 😊\nRecebemos sua encomenda:\n- Produto: ${tipo}\n- Personalização: ${texto} (cor: ${cor})\n- Quantidade: ${qtd}\n- Endereço: ${endereco}\n- Pagamento: ${pagamento}`;
  if(email) msg += `\n- E-mail: ${email}`;
  if(obs) msg += `\nObservações: ${obs}`;
  msg += `\n\nPor favor, confirme seus dados ou fale conosco para ajustes.`;
  msg += `\nPagamento: M-PESA, e-Mola ou transferência.`;
  msg += `\n\n✅ Confirmar pedido\n✏️ Editar pedido\n❌ Cancelar pedido`;
  msg += `\n\nEquipe Bordados & Delivery`;
  window.open(`https://wa.me/258848520196?text=${encodeURIComponent(msg)}`,'_blank');
});
// Portfólio interativo
function showPortfolioModal(imgSrc, title, desc) {
  const modal = document.getElementById('portfolioModal');
  const content = document.getElementById('portfolioModalContent');
  content.innerHTML = `<button class='portfolio-modal-close' onclick='closePortfolioModal()'>&times;</button><img src='${imgSrc}' alt='${title}'><h3 style='color:var(--primary);margin-bottom:8px;'>${title}</h3><div style='font-size:15px;color:#0f172a;'>${desc}</div>`;
  modal.classList.add('active');
}
function closePortfolioModal() {
  document.getElementById('portfolioModal').classList.remove('active');
}
// Filtro de categorias
document.querySelectorAll('.portfolio-filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.portfolio-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.portfolio-thumb').forEach(thumb => {
      if(filter === 'all' || thumb.getAttribute('data-category') === filter) {
        thumb.style.display = '';
      } else {
        thumb.style.display = 'none';
      }
    });
  });
});
const fileInput = document.getElementById('file');
const preview = document.getElementById('preview');
fileInput?.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      preview.innerHTML = `<img src=\"${evt.target.result}\" alt=\"Preview\" style=\"max-width:100px;max-height:60px;border-radius:6px;box-shadow:0 2px 8px #0001\">`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.textContent = 'Nenhuma imagem carregada';
  }
});

// Botão WhatsApp envia dados do formulário
document.getElementById('btnWhatsapp')?.addEventListener('click', function() {
  const nome = document.getElementById('name').value;
  const tel = document.getElementById('phone').value;
  const qtd = document.getElementById('qty').value;
  const serv = document.getElementById('service').value;
  const data = document.getElementById('date').value;
  const obs = document.getElementById('notes').value;
  let msg = `Olá, ${nome}! 😊\nRecebemos sua encomenda de ${qtd} ${serv}.`;
  if(data) msg += `\nData de entrega: ${data}`;
  if(obs) msg += `\nObservações: ${obs}`;
  msg += `\n\nPor favor, confirme seus dados ou fale conosco para ajustes.`;
  msg += `\nPagamento: M-PESA, e-Mola ou transferência.`;
  msg += `\n\n✅ Confirmar pedido\n✏️ Editar pedido\n❌ Cancelar pedido`;
  msg += `\n\nEquipe Bordados & Delivery`;
  window.open(`https://wa.me/258848520196?text=${encodeURIComponent(msg)}`,'_blank');
});
