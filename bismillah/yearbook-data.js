(function () {
  const YEARBOOK_STORAGE_KEY = 'khatulistiwa-yearbook-data';
  const DEFAULT_CATEGORIES = [
    'Paling rame',
    'Paling rajin',
    'Paling santai',
    'Paling sering telat',
    'Paling receh',
    'Anak dokumentasi'
  ];

  const DEFAULT_QUOTES = [
    'Yang penting hadir, urusan sisanya belakangan.',
    'Nanti juga kelar kalau dikerjain bareng.',
    'Kalau ada foto, tag aku ya!',
    'Bentar, gue mikir dulu.',
    'Kita ketawa dulu, paniknya nanti aja.',
    'Datang membawa cerita, pulang membawa foto.',
    'Ujian cuma sebentar, kenangan yang lama.',
    'Jangan tanya besok ada tugas apa.',
    'Kantin adalah rumah kedua saya.',
    'Hidup ini singkat, perbanyak tidur di kelas.'
  ];

  const DEFAULT_FACTS = [
    'Punya koleksi foto random teman seangkatan paling banyak.',
    'Sering jadi orang terakhir yang masuk grup chat.',
    'Kalau sudah ketawa, suaranya terdengar sampai lantai 3.',
    'Paling hafal jadwal piket kelas padahal jarang piket.',
    'Pernah salah masuk kelas tapi tetap duduk santai.',
    'Selalu punya stok camilan di kolong meja.',
    'Pernah ketiduran dari jam pertama sampai istirahat.',
    'Suka pinjam pulpen tapi lupa ngembaliin.'
  ];

  // Isi folder lokal di ./assets/foto/ lalu tambahkan nama file di array ini.
  // Contoh: './assets/foto/1.jpg', './assets/foto/2.jpg'
  const LOCAL_PHOTO_FILES = [  
    './assets/foto/https://cdn.phototourl.com/member/2026-09-03-ca131aa7-6af9-4aab-85ef-bd2ce84311d3.jpg',
  './assets/foto/https://cdn.phototourl.com/member/2026-09-03-11e6c57a-fd76-4650-86bb-d906850c30a4.jpg',
  './assets/foto/https://cdn.phototourl.com/member/2026-09-03-374f975c-1ee7-4f1f-99b9-bc689d7e6135.jpg',
  './assets/foto/https://cdn.phototourl.com/member/2026-09-03-1059da00-65e0-4aec-bacd-f7b20a010cdb.jpg'];

  function resolvePersonPhoto(id) {
    if (LOCAL_PHOTO_FILES.length) {
      return LOCAL_PHOTO_FILES[Math.floor(Math.random() * LOCAL_PHOTO_FILES.length)];
    }
    return `https://picsum.photos/seed/yearbook${id}/700/850`;
  }

  function buildDefaultPeople() {
    return Array.from({ length: 145 }, (_, i) => {
      const id = i + 1;
      return {
        id,
        name: `Teman ${String(id).padStart(3, '0')}`,
        nick: `@teman${id}`,
        category: DEFAULT_CATEGORIES[i % DEFAULT_CATEGORIES.length],
        quote: DEFAULT_QUOTES[i % DEFAULT_QUOTES.length],
        fact: DEFAULT_FACTS[i % DEFAULT_FACTS.length],
        photo: resolvePersonPhoto(id)
      };
    });
  }

  function normalizePerson(raw, index) {
    const fallback = buildDefaultPeople()[index] || buildDefaultPeople()[0];
    return {
      id: Number(raw && raw.id ? raw.id : index + 1),
      name: raw && raw.name ? raw.name : fallback.name,
      nick: raw && raw.nick ? raw.nick : fallback.nick,
      category: raw && raw.category ? raw.category : fallback.category,
      quote: raw && raw.quote ? raw.quote : fallback.quote,
      fact: raw && raw.fact ? raw.fact : fallback.fact,
      photo: raw && raw.photo ? raw.photo : fallback.photo
    };
  }

  function getYearbookPeople() {
    try {
      const raw = localStorage.getItem(YEARBOOK_STORAGE_KEY);
      if (!raw) return buildDefaultPeople();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.length) return buildDefaultPeople();
      return parsed.map((person, index) => normalizePerson(person, index));
    } catch (error) {
      return buildDefaultPeople();
    }
  }

  function saveYearbookPeople(people) {
    try {
      const safeList = Array.isArray(people)
        ? people.map((person, index) => normalizePerson(person, index))
        : buildDefaultPeople();
      localStorage.setItem(YEARBOOK_STORAGE_KEY, JSON.stringify(safeList));
      return true;
    } catch (error) {
      return false;
    }
  }

  function updatePersonById(id, patch) {
    const people = getYearbookPeople();
    const nextPeople = people.map((person) => {
      if (Number(person.id) === Number(id)) {
        return { ...person, ...patch };
      }
      return person;
    });
    saveYearbookPeople(nextPeople);
    return nextPeople;
  }

  window.YearbookData = {
    YEARBOOK_STORAGE_KEY,
    buildDefaultPeople,
    getYearbookPeople,
    saveYearbookPeople,
    updatePersonById,
    normalizePerson
  };
})();
