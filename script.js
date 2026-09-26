const services = [
  {name:'Katito Express', price:15, duration:35, time:'30–35 min', detail:'Limpieza, tónico, espátula ultrasónica, hidratación y protector solar.'},
  {name:'Katito Clean', price:22, duration:55, time:'45–55 min', detail:'Limpieza profunda, exfoliación, espátula ultrasónica, mascarilla, hidratación y protector solar.'},
  {name:'Katito Purify', price:25, duration:60, time:'50–60 min', detail:'Limpieza, exfoliación, alta frecuencia, mascarilla de arcilla, Oil Control y protector solar.'},
  {name:'Katito HydraGlow', price:25, duration:60, time:'50–60 min', detail:'Exfoliación suave, ácido hialurónico, Collagen Booster, FotoLED y protector solar.'},
  {name:'Katito FotoLED', price:20, duration:45, time:'40–45 min', detail:'Limpieza, espátula ultrasónica, FotoLED, ácido hialurónico, hidratación y protector solar.'},
  {name:'Katito Premium', price:35, duration:75, time:'60–75 min', detail:'Exfoliación, alta frecuencia, ácido hialurónico, FotoLED, Collagen Booster y SPF 50+.'},
  {name:'Katito Men', price:22, duration:50, time:'45–50 min', detail:'Limpieza, exfoliación suave, espátula, mascarilla, Oil Control, hidratación y protector solar.'},
  {name:'Pestañas por punto', price:12, duration:60, time:'Duración por confirmar', detail:'Aplicación personalizada para realzar y definir la mirada.'},
  {name:'Laminado de cejas', price:10, duration:60, time:'Duración por confirmar', detail:'Cejas definidas, ordenadas y con un efecto natural.'}
];

const grid = document.querySelector('#serviceGrid');
const serviceSelect = document.querySelector('#service');
const timeSelect = document.querySelector('#time');
const dateInput = document.querySelector('#date');

services.forEach((service, index) => {
  grid.insertAdjacentHTML('beforeend', `<article class="service-card"><div class="service-top"><h3>${service.name}</h3><span class="service-price">$${service.price}</span></div><p>${service.detail}</p><div class="service-meta"><span>${service.time}</span><button type="button" data-index="${index}">Reservar →</button></div></article>`);
  serviceSelect.insertAdjacentHTML('beforeend', `<option value="${index}">${service.name} · $${service.price} · ${service.time}</option>`);
});

const today = new Date();
dateInput.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

function refreshTimes(){
  const selected = services[Number(serviceSelect.value)];
  const duration = selected?.duration || 60;
  timeSelect.innerHTML = '<option value="">Selecciona</option>';
  for(let minutes=600; minutes+duration<=1140; minutes+=30){
    const hour = String(Math.floor(minutes/60)).padStart(2,'0');
    const min = String(minutes%60).padStart(2,'0');
    timeSelect.insertAdjacentHTML('beforeend', `<option>${hour}:${min}</option>`);
  }
}

serviceSelect.addEventListener('change', refreshTimes);
grid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-index]');
  if(!button) return;
  serviceSelect.value = button.dataset.index;
  refreshTimes();
  document.querySelector('#reservar').scrollIntoView({behavior:'smooth'});
});

document.querySelector('#bookingForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const value = serviceSelect.value;
  const selected = services[Number(value)];
  const serviceName = selected.name;
  const price = `$${selected.price}`;
  const chosenDate = new Date(`${dateInput.value}T12:00:00`);
  const day = chosenDate.toLocaleDateString('es-SV',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const sundayNote = chosenDate.getDay() === 0 ? '\nNota: domingo sujeto a cita previa.' : '';
  const message = `Hola Katito Studio, quisiera solicitar una cita.\n\nServicio: ${serviceName}\nPrecio: ${price}\nFecha: ${day}\nHora: ${timeSelect.value}\nEspecialista: ${document.querySelector('#tech').value}\nNombre: ${document.querySelector('#name').value}\nTeléfono: ${document.querySelector('#phone').value}\nComentario: ${document.querySelector('#notes').value || 'Ninguno'}${sundayNote}\n\nQuedo pendiente de confirmación.`;
  window.open(`https://wa.me/50370138750?text=${encodeURIComponent(message)}`,'_blank','noopener');
});

refreshTimes();
document.querySelector('#year').textContent = new Date().getFullYear();
