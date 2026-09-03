(function () {
  const data = window.YearbookData;
  let people = data.getYearbookPeople();
  let currentIndex = 0;

  const form = document.getElementById('studentForm');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const saveBtn = document.getElementById('saveBtn');
  const resetBtn = document.getElementById('resetBtn');
  const notice = document.getElementById('notice');
  const counter = document.getElementById('studentCounter');
  const previewName = document.getElementById('previewName');
  const previewNick = document.getElementById('previewNick');
  const previewCategory = document.getElementById('previewCategory');
  const previewQuote = document.getElementById('previewQuote');
  const previewPhoto = document.getElementById('previewPhoto');

  function notify(message) {
    notice.textContent = message;
    clearTimeout(notify.tid);
    notify.tid = setTimeout(() => {
      notice.textContent = '';
    }, 2200);
  }

  function saveCurrentForm() {
    if (!form) return;
    const id = Number(document.getElementById('studentId').value || people[currentIndex].id);
    const payload = {
      id,
      name: document.getElementById('studentName').value.trim(),
      nick: document.getElementById('studentNick').value.trim(),
      category: document.getElementById('studentCategory').value.trim(),
      quote: document.getElementById('studentQuote').value.trim(),
      fact: document.getElementById('studentFact').value.trim(),
      photo: document.getElementById('studentPhoto').value.trim()
    };

    const nextList = people.map((person) => Number(person.id) === Number(id) ? { ...person, ...payload } : person);
    data.saveYearbookPeople(nextList);
    people = data.getYearbookPeople();
    notify(`Data siswa #${String(id).padStart(3, '0')} tersimpan.`);
    renderPreview(payload);
  }

  function renderPreview(payload) {
    if (!previewName) return;
    previewName.textContent = payload.name || 'Nama siswa';
    previewNick.textContent = payload.nick || '@nickname';
    previewCategory.textContent = payload.category || 'Kategori';
    previewQuote.textContent = payload.quote || 'Quote akan muncul di sini';
    previewPhoto.src = payload.photo || 'https://picsum.photos/seed/yearbook-placeholder/700/850';
  }

  function renderForm() {
    const currentPerson = people[currentIndex];
    if (!currentPerson) return;

    document.getElementById('studentId').value = currentPerson.id;
    document.getElementById('studentName').value = currentPerson.name;
    document.getElementById('studentNick').value = currentPerson.nick;
    document.getElementById('studentCategory').value = currentPerson.category;
    document.getElementById('studentQuote').value = currentPerson.quote;
    document.getElementById('studentFact').value = currentPerson.fact;
    document.getElementById('studentPhoto').value = currentPerson.photo;

    counter.textContent = `Siswa ${currentIndex + 1} / ${people.length}`;
    renderPreview(currentPerson);
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + people.length) % people.length;
    renderForm();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % people.length;
    renderForm();
  });

  saveBtn.addEventListener('click', saveCurrentForm);

  resetBtn.addEventListener('click', () => {
    const defaults = data.buildDefaultPeople();
    data.saveYearbookPeople(defaults);
    window.location.reload();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveCurrentForm();
  });

  renderForm();
})();
