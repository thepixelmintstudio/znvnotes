const content = document.getElementById('pageContent');
const selectionPanel = document.getElementById('selectionPanel');
let selected = null;
let zoom = 0.75;

const blocks = {
  heading: () => `<div class="content-block heading-block"><div class="block-toolbar">Heading <button onclick="removeBlock(this)">×</button></div><span class="kicker">02.03</span><h1 contenteditable="true">VELOCITY</h1><div class="paragraph-block" contenteditable="true">Understanding the rate of change of displacement.</div></div>`,
  paragraph: () => `<div class="content-block"><div class="block-toolbar">Text <button onclick="removeBlock(this)">×</button></div><div class="paragraph-block" contenteditable="true">Write your explanation here. Explain the idea clearly before introducing the formal definition.</div></div>`,
  important: () => box('important-box','★ IMPORTANT','Velocity is a vector quantity. It depends on both magnitude and direction.'),
  formula: () => `<div class="content-block"><div class="block-toolbar">Formula <button onclick="removeBlock(this)">×</button></div><div class="zenova-box formula-box"><div class="box-title">∑ FORMULA</div><div class="formula-body" contenteditable="true">\\[v = \\frac{\\Delta x}{\\Delta t}\\]</div></div></div>`,
  concept: () => box('concept-box','◆ ZENOVA CONCEPT','When an object changes its position with time and has a particular direction, we describe its motion using velocity.'),
  example: () => box('example-box','✓ SOLVED EXAMPLE','A car travels 20 km towards North in 30 min. Find its average velocity. Write the given data, equation, substitution and final answer.'),
  kcet: () => box('kcet-box','◎ KCET ALERT','Questions can test the sign of velocity, direction, average velocity and velocity–time graphs.'),
  mistake: () => box('mistake-box','! COMMON MISTAKE','Students often confuse speed with velocity. Speed has magnitude only; velocity has magnitude and direction.'),
  memory: () => box('memory-box','💡 MEMORY TRICK','“V for Vector” — velocity is a vector quantity.'),
  image: () => `<div class="content-block"><div class="block-toolbar">Image <button onclick="removeBlock(this)">×</button></div><div class="image-block" onclick="insertImage(this)">Click to add an image / diagram</div></div>`,
  table: () => `<div class="content-block table-block"><div class="block-toolbar">Table <button onclick="removeBlock(this)">×</button></div><table contenteditable="true"><tr><th>Quantity</th><th>Scalar / Vector</th></tr><tr><td>Speed</td><td>Scalar</td></tr><tr><td>Velocity</td><td>Vector</td></tr><tr><td>Displacement</td><td>Vector</td></tr></table></div>`,
  mcq: () => `<div class="content-block"><div class="block-toolbar">MCQ <button onclick="removeBlock(this)">×</button></div><div class="mcq-box"><div class="mcq-title">🎯 KCET PRACTICE</div><div class="mcq-question" contenteditable="true">Which of the following quantities is a vector?</div><div class="mcq-options" contenteditable="true">A) Speed<br>B) Distance<br>C) Velocity<br>D) Time</div></div></div>`
};

function box(cls,title,text){
  return `<div class="content-block"><div class="block-toolbar">${title}<button onclick="removeBlock(this)">×</button></div><div class="zenova-box ${cls}"><div class="box-title">${title}</div><div class="box-body" contenteditable="true">${text}</div></div></div>`;
}

function addBlock(type){
  const wrap=document.createElement('div');
  wrap.innerHTML=blocks[type]();
  const el=wrap.firstElementChild;
  content.appendChild(el);
  attachSelection(el);
  if(window.MathJax) MathJax.typesetPromise([el]);
  showToast(type.replace('-', ' ')+' added');
}

function attachSelection(el){
  el.addEventListener('click',e=>{
    if(e.target.closest('button')) return;
    document.querySelectorAll('.content-block.selected').forEach(x=>x.classList.remove('selected'));
    el.classList.add('selected'); selected=el; renderSelection();
  });
}

function removeBlock(btn){
  const el=btn.closest('.content-block');
  if(el===selected) selected=null;
  el.remove(); renderSelection(); save();
}

function renderSelection(){
  if(!selected){selectionPanel.textContent='Select a block on the page.';return}
  const cls=[...selected.querySelectorAll('*')].map(x=>x.className).find(x=>typeof x==='string' && x.includes('box'))||'content-block';
  selectionPanel.innerHTML=`<div style="font-weight:800;margin-bottom:8px">Block selected</div><div style="font-size:10px;color:#7b879b">Type</div><div style="font-weight:600;margin:3px 0 10px">${friendlyType(selected)}</div><div style="font-size:10px;color:#7b879b">Tip</div><div style="font-size:10px;line-height:1.5">Edit text directly on the page. Design styles are controlled by Zenova.</div>`;
}
function friendlyType(el){
  if(el.querySelector('.important-box')) return 'Important Box';
  if(el.querySelector('.formula-box')) return 'Formula Box';
  if(el.querySelector('.concept-box')) return 'Concept Box';
  if(el.querySelector('.example-box')) return 'Solved Example';
  if(el.querySelector('.kcet-box')) return 'KCET Alert';
  if(el.querySelector('.mistake-box')) return 'Common Mistake';
  if(el.querySelector('.memory-box')) return 'Memory Trick';
  if(el.querySelector('.mcq-box')) return 'MCQ';
  if(el.querySelector('.image-block')) return 'Image / Diagram';
  if(el.querySelector('h1')) return 'Heading';
  return 'Text';
}

document.querySelectorAll('.block-btn').forEach(btn=>btn.addEventListener('click',()=>addBlock(btn.dataset.block)));

function template(type){
  content.innerHTML='';
  const add=t=>{const d=document.createElement('div');d.innerHTML=blocks[t]();const el=d.firstElementChild;content.appendChild(el);attachSelection(el);};
  if(type==='concept'){['heading','concept','paragraph','formula','important','kcet','mistake'].forEach(add);}
  if(type==='example'){['heading','paragraph','example','formula','kcet','mcq'].forEach(add);}
  if(type==='revision'){['heading','formula','important','mistake','memory','mcq'].forEach(add);}
  if(type==='blank'){}
  if(window.MathJax) MathJax.typesetPromise([content]);
  showToast('Template applied');
}
document.querySelectorAll('.template-btn').forEach(b=>b.addEventListener('click',()=>template(b.dataset.template)));

function insertImage(holder){
  const input=document.createElement('input'); input.type='file'; input.accept='image/*';
  input.onchange=()=>{const file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=e=>{holder.innerHTML=`<img src="${e.target.result}" alt="Zenova diagram">`;save();};reader.readAsDataURL(file)};
  input.click();
}

function save(){
  const data={book:document.getElementById('bookInput').value,chapter:document.getElementById('chapterInput').value,page:document.getElementById('pageInput').value,html:content.innerHTML};
  localStorage.setItem('zenova-note-studio-v1',JSON.stringify(data)); showToast('Saved locally');
}
function load(){
  const raw=localStorage.getItem('zenova-note-studio-v1');
  if(!raw){template('concept');return}
  const d=JSON.parse(raw);
  document.getElementById('bookInput').value=d.book||'ZENOVA KCET PHYSICS';
  document.getElementById('chapterInput').value=d.chapter||'Chapter 02 · Motion in a Straight Line';
  document.getElementById('pageInput').value=d.page||21;
  content.innerHTML=d.html||'';
  content.querySelectorAll('.content-block').forEach(attachSelection);
  updateMeta();
  if(window.MathJax) MathJax.typesetPromise([content]);
}
function updateMeta(){
  document.getElementById('bookTitle').textContent=document.getElementById('bookInput').value;
  document.getElementById('chapterTitle').textContent=document.getElementById('chapterInput').value;
  document.getElementById('pageNumber').textContent=document.getElementById('pageInput').value;
  document.getElementById('footerPage').textContent=document.getElementById('pageInput').value;
}
['bookInput','chapterInput','pageInput'].forEach(id=>document.getElementById(id).addEventListener('input',updateMeta));

document.getElementById('saveBtn').onclick=save;
document.getElementById('printBtn').onclick=()=>{document.querySelectorAll('.content-block.selected').forEach(x=>x.classList.remove('selected'));window.print()};
document.getElementById('previewBtn').onclick=()=>{document.querySelectorAll('.content-block.selected').forEach(x=>x.classList.remove('selected'));showToast('Preview mode: use Export / Print PDF to create PDF')};
document.getElementById('clearPage').onclick=()=>{if(confirm('Clear this page?')){content.innerHTML='';save();}};
document.getElementById('zoomIn').onclick=()=>setZoom(Math.min(1.1,zoom+.05));
document.getElementById('zoomOut').onclick=()=>setZoom(Math.max(.5,zoom-.05));
function setZoom(z){zoom=z;document.getElementById('notePage').style.transform=`scale(${z})`;document.getElementById('zoomLabel').textContent=Math.round(z*100)+'%';}

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),1600)}

load();
