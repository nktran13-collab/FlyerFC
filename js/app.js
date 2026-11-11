/* ===== FlyersFC — app logic ===== */
(function () {
  'use strict';

  const LEVEL_KEYS = ['starters', 'movers', 'flyers'];
  const STORE_KEY = 'flyerfc.progress.v1';
  const SOUND_KEY = 'flyerfc.sound.v1';
  const ALL_TOPIC = '__all';
  const WORDS_PER_QUIZ = 10;

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const app = {
    levelKey: 'starters',
    topic: null,
    study: null,
    quiz: null,
    lastResult: null,
    progress: readJSON(STORE_KEY, {}),
    soundOn: readJSON(SOUND_KEY, true)
  };

  const modalEl = $('#modal');
  const confettiEl = $('#confetti');

  /* ---------- utils ---------- */
  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* storage may be blocked */ }
  }

  function saveProgress() { writeJSON(STORE_KEY, app.progress); }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  function starsFor(ratio) {
    if (ratio >= 0.9) return 3;
    if (ratio >= 0.7) return 2;
    if (ratio >= 0.5) return 1;
    return 0;
  }

  function starRow(filled, total) {
    const n = total || 3;
    let out = '';
    for (let i = 0; i < n; i += 1) {
      out += i < filled ? '<span>\u2605</span>' : '<span class="off">\u2605</span>';
    }
    return '<span class="stars" aria-label="' + filled + '/' + n + ' sao">' + out + '</span>';
  }

  /* ---------- progress helpers ---------- */
  function topicState(levelKey, topicId) {
    if (!app.progress[levelKey]) app.progress[levelKey] = {};
    const lvl = app.progress[levelKey];
    if (!lvl[topicId]) lvl[topicId] = { known: [], best: 0 };
    return lvl[topicId];
  }

  function getTopic(levelKey, topicId) {
    const lv = VOCAB[levelKey];
    if (topicId === ALL_TOPIC) {
      return {
        id: ALL_TOPIC,
        isAll: true,
        name: 'Thử thách tổng hợp',
        vi: 'Tất cả chủ đề ' + lv.meta.name,
        icon: '🏆',
        tone: 5,
        words: lv.topics.reduce((acc, t) => acc.concat(t.words), [])
      };
    }
    return lv.topics.find((t) => t.id === topicId);
  }

  function knownInTopic(levelKey, topic) {
    if (topic.isAll) {
      return VOCAB[levelKey].topics.reduce((sum, t) => sum + knownInTopic(levelKey, t), 0);
    }
    const st = topicState(levelKey, topic.id);
    const words = new Set(topic.words.map((w) => w.en));
    return st.known.filter((en) => words.has(en)).length;
  }

  function levelStats(levelKey) {
    const lv = VOCAB[levelKey];
    let total = 0;
    let known = 0;
    let stars = 0;
    lv.topics.forEach((t) => {
      total += t.words.length;
      known += knownInTopic(levelKey, t);
      stars += starsFor(topicState(levelKey, t.id).best || 0);
    });
    return { total: total, known: known, stars: stars, maxStars: lv.topics.length * 3 };
  }

  function realTopicIdForWord(levelKey, word) {
    const t = VOCAB[levelKey].topics.find((topic) => topic.words.some((w) => w.en === word.en));
    return t ? t.id : null;
  }

  /* ---------- sound ---------- */
  let audioCtx = null;

  function getAudio() {
    if (!app.soundOn) return null;
    try {
      if (!audioCtx) {
        const Ctor = window.AudioContext || window.webkitAudioContext;
        if (!Ctor) return null;
        audioCtx = new Ctor();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    } catch (err) {
      return null;
    }
  }

  function tone(freq, start, dur, type, vol) {
    const ctx = getAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime + start;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(vol || 0.1, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }

  function sfx(kind) {
    if (!app.soundOn) return;
    if (kind === 'good') {
      [659, 880, 1047].forEach((f, i) => tone(f, i * 0.09, 0.2, 'sine', 0.09));
    } else if (kind === 'bad') {
      tone(311, 0, 0.16, 'triangle', 0.07);
      tone(233, 0.14, 0.24, 'triangle', 0.07);
    } else if (kind === 'flip') {
      tone(740, 0, 0.07, 'sine', 0.05);
    } else if (kind === 'star') {
      tone(880, 0, 0.1, 'sine', 0.07);
      tone(1175, 0.08, 0.14, 'sine', 0.07);
    } else if (kind === 'win') {
      [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle', 0.08));
    }
  }

  /* ---------- speech ---------- */
  const synth = window.speechSynthesis;
  let englishVoice = null;

  function prepareVoices() {
    if (!synth) return;
    const load = () => {
      const voices = synth.getVoices();
      englishVoice =
        voices.find((v) => /en-GB/i.test(v.lang) && /female|Google|Karen|Serena/i.test(v.name)) ||
        voices.find((v) => /en-GB/i.test(v.lang)) ||
        voices.find((v) => /^en/i.test(v.lang)) ||
        null;
    };
    load();
    if (typeof synth.onvoiceschanged !== 'undefined') synth.onvoiceschanged = load;
  }

  function speak(text) {
    if (!synth || !text) return;
    try {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-GB';
      utter.rate = 0.85;
      utter.pitch = 1.08;
      if (englishVoice) utter.voice = englishVoice;
      synth.speak(utter);
    } catch (err) { /* speech not available */ }
  }

  /* ---------- confetti ---------- */
  const CONFETTI_CHARS = ['⭐', '🎉', '💖', '✨', '🌈', '🍬', '🌟', '🎈'];

  function confetti(count) {
    if (!confettiEl) return;
    const n = count || 22;
    for (let i = 0; i < n; i += 1) {
      const bit = document.createElement('span');
      bit.textContent = pick(CONFETTI_CHARS);
      bit.style.left = 32 + Math.random() * 36 + 'vw';
      bit.style.top = 34 + Math.random() * 26 + 'vh';
      bit.style.setProperty('--x', (Math.random() * 2 - 1) * 44 + 'vw');
      bit.style.setProperty('--y', -(18 + Math.random() * 44) + 'vh');
      bit.style.setProperty('--r', Math.round(Math.random() * 720 - 360) + 'deg');
      bit.style.setProperty('--size', Math.round(14 + Math.random() * 20) + 'px');
      bit.style.setProperty('--dur', (1.1 + Math.random() * 0.9).toFixed(2) + 's');
      confettiEl.appendChild(bit);
      setTimeout(() => bit.remove(), 2400);
    }
  }

  /* ---------- navigation ---------- */
  function showScreen(name) {
    $$('.screen').forEach((s) => s.classList.toggle('is-active', s.id === 'screen-' + name));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearQuizTimer() {
    if (app.quiz && app.quiz.timer) {
      clearTimeout(app.quiz.timer);
      app.quiz.timer = null;
    }
  }

  function goHome() {
    clearQuizTimer();
    app.study = null;
    app.quiz = null;
    app.topic = null;
    closeModal();
    if (synth) synth.cancel();
    renderHome();
    showScreen('home');
  }

  function openLevel(levelKey) {
    clearQuizTimer();
    app.levelKey = levelKey;
    app.topic = null;
    renderTopics();
    showScreen('topics');
  }

  /* ---------- render: home ---------- */
  function renderHome() {
    const grid = $('#level-grid');
    if (!grid) return;
    grid.innerHTML = LEVEL_KEYS.filter((k) => VOCAB[k])
      .map((key) => {
        const lv = VOCAB[key];
        const stats = levelStats(key);
        return (
          '<button class="level-card lvl-' + key + '" data-level="' + key + '">' +
            '<span class="level-emoji">' + lv.meta.mascot + '</span>' +
            '<span class="level-info">' +
              '<span class="level-name">' + lv.meta.name + '</span>' +
              '<span class="level-vi">' + esc(lv.meta.vi) + ' · ' + esc(lv.meta.tagline) + '</span>' +
              '<span class="level-meta">📚 ' + lv.topics.length + ' chủ đề · ' + stats.total + ' từ</span>' +
            '</span>' +
          '</button>'
        );
      })
      .join('');
  }

  /* ---------- render: topics ---------- */
  function renderTopics() {
    const lv = VOCAB[app.levelKey];
    const tone = app.levelKey === 'movers' ? 3 : app.levelKey === 'flyers' ? 5 : 1;
    const screen = $('#screen-topics');

    const cards = lv.topics
      .map((t) => {
        const known = knownInTopic(app.levelKey, t);
        const st = topicState(app.levelKey, t.id);
        const pct = Math.round((known / t.words.length) * 100);
        const stars = starsFor(st.best || 0);
        return (
          '<button class="topic-card tone-' + t.tone + '" data-topic="' + t.id + '">' +
            '<span class="topic-top">' +
              '<span class="topic-icon">' + t.icon + '</span>' +
              '<span><span class="topic-name">' + esc(t.name) + '</span>' +
              '<span class="topic-vi">' + esc(t.vi) + '</span></span>' +
            '</span>' +
            '<span class="topic-foot">' +
              '<span class="mini-bar"><i style="width:' + pct + '%"></i></span>' +
              '<span>' + known + '/' + t.words.length + '</span>' +
              starRow(stars) +
            '</span>' +
          '</button>'
        );
      })
      .join('');

    const allStats = levelStats(app.levelKey);

    screen.innerHTML =
      '<div class="page-head">' +
        '<button class="back-btn" data-action="home">← Trang chủ</button>' +
        '<div class="page-title">Chọn chủ đề</div>' +
        '<span class="level-pill lvl-' + app.levelKey + '">' + lv.meta.mascot + ' ' + lv.meta.name + ' · ' + esc(lv.meta.vi) + '</span>' +
        '<div class="page-actions"><span class="chip">⭐ ' + allStats.known + '/' + allStats.total + ' từ</span></div>' +
      '</div>' +
      '<button type="button" class="all-card tone-' + tone + '" data-topic="' + ALL_TOPIC + '">' +
        '<span class="topic-icon">🏆</span>' +
        '<span><span class="all-title">Thử thách tổng hợp</span>' +
        '<span class="all-sub">10 câu trắc nghiệm từ mọi chủ đề ' + esc(lv.meta.name) + '</span></span>' +
        '<span class="all-go">Chơi ngay →</span>' +
      '</button>' +
      '<div class="topic-grid">' + cards + '</div>';
  }

  /* ---------- modal: mode picker ---------- */
  function openTopicModal(topicId) {
    const topic = getTopic(app.levelKey, topicId);
    if (!topic) return;
    app.topic = topic;
    const known = knownInTopic(app.levelKey, topic);
    const st = topic.isAll ? null : topicState(app.levelKey, topic.id);
    const bestPct = st ? Math.round((st.best || 0) * 100) : 0;

    modalEl.innerHTML =
      '<div class="modal-card tone-' + topic.tone + '" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
        '<div class="modal-icon">' + topic.icon + '</div>' +
        '<h3 class="modal-title" id="modal-title">' + esc(topic.name) + '</h3>' +
        '<p class="modal-sub">' + esc(topic.vi) + ' · ' + topic.words.length + ' từ vựng</p>' +
        '<div class="modal-stats">' +
          '<span class="chip">⭐ ' + known + '/' + topic.words.length + ' đã nhớ</span>' +
          (topic.isAll
            ? '<span class="chip">🎲 Câu hỏi ngẫu nhiên</span>'
            : '<span class="chip">🎯 Cao nhất ' + bestPct + '%</span>') +
        '</div>' +
        '<div class="mode-actions">' +
          '<button class="mode-btn" data-mode="study">' +
            '<span class="mode-emoji">🃏</span>' +
            '<span><span class="mode-title">Thẻ ghi nhớ</span><span class="mode-sub">Lật thẻ, nghe phát âm, đánh dấu từ đã nhớ</span></span>' +
            '<span class="mode-arrow">→</span>' +
          '</button>' +
          '<button class="mode-btn" data-mode="quiz">' +
            '<span class="mode-emoji">🎯</span>' +
            '<span><span class="mode-title">Trắc nghiệm</span><span class="mode-sub">10 câu hỏi vui, nhận sao thưởng</span></span>' +
            '<span class="mode-arrow">→</span>' +
          '</button>' +
        '</div>' +
        '<button class="modal-close" data-action="close-modal">Để sau</button>' +
      '</div>';
    modalEl.hidden = false;
    const firstMode = modalEl.querySelector('.mode-btn');
    if (firstMode) firstMode.focus();
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.hidden = true;
    modalEl.innerHTML = '';
  }

  /* ---------- study (flashcards) ---------- */
  function startStudy(topic) {
    closeModal();
    app.topic = topic;
    app.study = { deck: shuffle(topic.words), index: 0, gained: new Set() };
    showScreen('study');
    renderStudy();
  }

  function renderStudy() {
    const s = app.study;
    const topic = app.topic;
    if (!s || !topic) return;
    const word = s.deck[s.index];
    const total = s.deck.length;
    const pct = Math.round((s.index / total) * 100);
    const known = knownInTopic(app.levelKey, topic);

    $('#screen-study').innerHTML =
      '<div class="study-wrap tone-' + topic.tone + '">' +
        '<div class="page-head">' +
          '<button class="back-btn" data-action="topics">← Chủ đề</button>' +
          '<div class="page-title" style="font-size:22px">' + topic.icon + ' ' + esc(topic.name) + '</div>' +
          '<div class="page-actions"><span class="chip">⭐ ' + known + '/' + topic.words.length + ' từ nhớ</span></div>' +
        '</div>' +
        '<div class="study-progress">' +
          '<span>Thẻ ' + (s.index + 1) + '/' + total + '</span>' +
          '<div class="progress-track"><i style="width:' + pct + '%"></i></div>' +
        '</div>' +
        '<div class="flash-scene">' +
          '<div class="flashcard" role="button" tabindex="0" aria-pressed="false" aria-label="Thẻ từ vựng, chạm để lật">' +
            '<div class="face face-front">' +
              '<div class="card-emoji">' + word.emoji + '</div>' +
              '<div class="card-word">' + esc(word.en) + '</div>' +
              '<div class="card-hint">👆 Chạm để xem nghĩa</div>' +
            '</div>' +
            '<div class="face face-back" aria-hidden="true">' +
              '<div class="card-emoji" style="font-size:52px">' + word.emoji + '</div>' +
              '<div class="card-vi">' + esc(word.vi) + '</div>' +
              '<div class="card-ex">' + esc(word.ex) + '</div>' +
              '<button class="speak-btn" data-say="' + esc(word.en) + '" tabindex="-1">🔊 Nghe phát âm</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="study-actions">' +
          '<button class="btn btn-no btn-grow" data-mark="no">😅 Chưa nhớ</button>' +
          '<button class="btn btn-ghost" data-flip>🔄 Lật thẻ</button>' +
          '<button class="btn btn-yes btn-grow" data-mark="yes">⭐ Đã nhớ</button>' +
        '</div>' +
        '<p class="study-tip">💡 Chạm vào thẻ để lật · Nghe phát âm chuẩn bản xứ</p>' +
      '</div>';
  }

  function toggleFlash(force) {
    const card = $('.flashcard');
    if (!card) return;
    const next = typeof force === 'boolean' ? force : !card.classList.contains('is-flipped');
    card.classList.toggle('is-flipped', next);
    card.setAttribute('aria-pressed', next ? 'true' : 'false');
    const front = card.querySelector('.face-front');
    const back = card.querySelector('.face-back');
    if (front) front.setAttribute('aria-hidden', next ? 'true' : 'false');
    if (back) {
      back.setAttribute('aria-hidden', next ? 'false' : 'true');
      $$('button', back).forEach((b) => { b.tabIndex = next ? 0 : -1; });
    }
    if (next) {
      sfx('flip');
      const s = app.study;
      if (s && s.deck[s.index]) speak(s.deck[s.index].en);
    }
  }

  function markCurrent(known) {
    const s = app.study;
    if (!s) return;
    const word = s.deck[s.index];
    if (known) {
      const topicId = app.topic.isAll ? realTopicIdForWord(app.levelKey, word) : app.topic.id;
      if (topicId) {
        const st = topicState(app.levelKey, topicId);
        if (st.known.indexOf(word.en) === -1) st.known.push(word.en);
        s.gained.add(word.en);
        saveProgress();
      }
      sfx('star');
    }
    s.index += 1;
    if (s.index >= s.deck.length) {
      renderStudyDone();
    } else {
      renderStudy();
    }
  }

  function renderStudyDone() {
    const topic = app.topic;
    const s = app.study;
    const known = knownInTopic(app.levelKey, topic);
    const gained = s ? s.gained.size : 0;
    const total = topic.words.length;

    $('#screen-study').innerHTML =
      '<div class="result-wrap tone-' + topic.tone + '">' +
        '<div class="result-card">' +
          '<div class="result-emoji">🎉</div>' +
          '<h2 class="result-title">Học xong rồi!</h2>' +
          '<p class="result-sub">Bạn vừa đi hết ' + total + ' thẻ của chủ đề ' + esc(topic.name) + '.</p>' +
          '<div class="score-badge">⭐ Đã nhớ <b>' + known + '</b>/' + total + ' từ</div>' +
          '<p class="result-words">Lượt này bạn đánh dấu đã nhớ thêm ' + gained + ' từ. Tuyệt lắm!</p>' +
          '<div class="result-actions">' +
            '<button class="btn btn-primary" data-restudy>🔁 Học lại</button>' +
            '<button class="btn btn-ghost" data-go-quiz>🎯 Làm trắc nghiệm</button>' +
            '<button class="btn btn-ghost" data-action="topics">📚 Chủ đề khác</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    confetti(20);
    sfx('win');
  }

  /* ---------- quiz ---------- */
  function buildQuiz(levelKey, topic) {
    const pool = topic.words;
    const chosen = shuffle(pool).slice(0, Math.min(WORDS_PER_QUIZ, pool.length));
    return chosen.map((word, i) => {
      const reverse = levelKey === 'flyers' && i % 2 === 1;
      const used = new Set([reverse ? word.en : word.vi]);
      const distractors = [];
      const shuffled = shuffle(pool);
      for (let k = 0; k < shuffled.length && distractors.length < 3; k += 1) {
        const cand = shuffled[k];
        if (cand.en === word.en) continue;
        const text = reverse ? cand.en : cand.vi;
        if (used.has(text)) continue;
        used.add(text);
        distractors.push(cand);
      }
      const options = shuffle([word].concat(distractors)).map((o) => ({
        text: reverse ? o.en : o.vi,
        correct: o.en === word.en
      }));
      return { word: word, reverse: reverse, options: options };
    });
  }

  function startQuiz(topic) {
    closeModal();
    clearQuizTimer();
    app.topic = topic;
    app.quiz = {
      questions: buildQuiz(app.levelKey, topic),
      index: 0,
      score: 0,
      locked: false,
      timer: null
    };
    showScreen('quiz');
    renderQuiz();
  }

  function renderQuiz() {
    const quiz = app.quiz;
    const topic = app.topic;
    if (!quiz || !topic) return;
    const q = quiz.questions[quiz.index];
    const total = quiz.questions.length;
    const pct = Math.round((quiz.index / total) * 100);
    const prompt = q.reverse ? q.word.vi : q.word.en;

    const options = q.options
      .map((opt, i) => {
        const key = String.fromCharCode(65 + i);
        return (
          '<button class="option" data-answer="' + i + '">' +
            '<span class="option-key">' + key + '</span>' +
            '<span>' + esc(opt.text) + '</span>' +
          '</button>'
        );
      })
      .join('');

    $('#screen-quiz').innerHTML =
      '<div class="quiz-wrap tone-' + topic.tone + '">' +
        '<div class="quiz-head">' +
          '<button class="back-btn" data-action="topics">← Chủ đề</button>' +
          '<span class="chip">' + topic.icon + ' ' + esc(topic.name) + '</span>' +
          '<span class="chip" style="margin-left:auto">Câu ' + (quiz.index + 1) + '/' + total + '</span>' +
          '<span class="chip" id="quiz-score">⭐ ' + quiz.score + '</span>' +
        '</div>' +
        '<div class="progress-track" style="margin-bottom:18px"><i style="width:' + pct + '%"></i></div>' +
        '<div class="quiz-card">' +
          (q.reverse
            ? ''
            : '<button class="quiz-speak" data-say="' + esc(q.word.en) + '" aria-label="Nghe phát âm">🔊</button>') +
          '<div class="quiz-word">' + esc(prompt) + '</div>' +
          '<div class="quiz-sub">' + (q.reverse ? 'Từ này trong tiếng Anh là gì?' : 'Từ này có nghĩa là gì?') + '</div>' +
        '</div>' +
        '<div class="options">' + options + '</div>' +
        '<div class="quiz-feedback" aria-live="polite"></div>' +
      '</div>';
  }

  function answerQuestion(index) {
    const quiz = app.quiz;
    if (!quiz || quiz.locked) return;
    const q = quiz.questions[quiz.index];
    const chosen = q.options[index];
    if (!chosen) return;
    quiz.locked = true;

    const buttons = $$('.option');
    buttons.forEach((b) => { b.disabled = true; });
    const feedback = $('.quiz-feedback');

    if (chosen.correct) {
      if (buttons[index]) buttons[index].classList.add('is-right');
      quiz.score += 1;
      if (feedback) {
        feedback.textContent = pick(['🎉 Chính xác! Giỏi quá!', '🌟 Đúng rồi! Bạn thật tuyệt!', '👏 Chuẩn luôn!', '💖 Quá đỉnh!']);
        feedback.className = 'quiz-feedback good';
      }
      sfx('good');
      confetti(10);
    } else {
      if (buttons[index]) buttons[index].classList.add('is-wrong');
      const correctIndex = q.options.findIndex((o) => o.correct);
      if (buttons[correctIndex]) buttons[correctIndex].classList.add('is-right');
      if (feedback) {
        feedback.textContent = 'Đáp án đúng: ' + (q.reverse ? q.word.en : q.word.vi) + ' 💡';
        feedback.className = 'quiz-feedback bad';
      }
      sfx('bad');
    }

    const scoreChip = $('#quiz-score');
    if (scoreChip) scoreChip.textContent = '⭐ ' + quiz.score;
    speak(q.word.en);

    quiz.timer = setTimeout(() => {
      quiz.index += 1;
      if (quiz.index >= quiz.questions.length) {
        finishQuiz();
      } else {
        quiz.locked = false;
        renderQuiz();
      }
    }, chosen.correct ? 1050 : 1900);
  }

  function finishQuiz() {
    const quiz = app.quiz;
    const topic = app.topic;
    if (!quiz || !topic) return;
    clearQuizTimer();
    const total = quiz.questions.length;
    const ratio = total ? quiz.score / total : 0;
    const stars = starsFor(ratio);

    if (!topic.isAll) {
      const st = topicState(app.levelKey, topic.id);
      if (ratio > (st.best || 0)) {
        st.best = ratio;
        saveProgress();
      }
    }

    app.lastResult = { topic: topic, score: quiz.score, total: total, stars: stars, levelKey: app.levelKey };
    renderResult();
    showScreen('result');
    if (stars >= 2) {
      confetti(34);
      sfx('win');
    } else {
      sfx('good');
    }
  }

  function renderResult() {
    const r = app.lastResult;
    if (!r) return;
    const ratio = r.total ? r.score / r.total : 0;
    const outcomes = [
      { min: 0.9, emoji: '🏆', title: 'Tuyệt vời quá!', sub: 'Bạn là siêu sao từ vựng của lớp!' },
      { min: 0.7, emoji: '🌟', title: 'Giỏi lắm!', sub: 'Chỉ còn một chút nữa là đạt 3 sao rồi!' },
      { min: 0.5, emoji: '💪', title: 'Khá tốt đó!', sub: 'Ôn thêm một lượt thẻ là nhớ ngay thôi.' },
      { min: 0, emoji: '🌱', title: 'Mình luyện lại nhé!', sub: 'Không sao đâu, học từ từ rồi bạn sẽ giỏi.' }
    ];
    const outcome = outcomes.find((o) => ratio >= o.min);
    let stars = '';
    for (let i = 0; i < 3; i += 1) {
      stars += i < r.stars ? '<span>⭐</span>' : '<span class="off">⭐</span>';
    }

    $('#screen-result').innerHTML =
      '<div class="result-wrap tone-' + r.topic.tone + '">' +
        '<div class="result-card">' +
          '<div class="result-emoji">' + outcome.emoji + '</div>' +
          '<h2 class="result-title">' + outcome.title + '</h2>' +
          '<p class="result-sub">' + outcome.sub + '</p>' +
          '<div class="big-stars">' + stars + '</div>' +
          '<div class="score-badge">Đúng <b>' + r.score + '</b>/' + r.total + ' câu</div>' +
          '<p class="result-words">' + VOCAB[r.levelKey].meta.name + ' · ' + esc(r.topic.name) + '</p>' +
          '<div class="result-actions">' +
            '<button class="btn btn-primary" data-replay>🔁 Chơi lại</button>' +
            '<button class="btn btn-ghost" data-go-study>🃏 Học thẻ</button>' +
            '<button class="btn btn-ghost" data-action="topics">📚 Chọn chủ đề</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ---------- install to home screen ---------- */
  let installPrompt = null;

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function updateInstallUI() {
    const show = !isStandalone() && (!!installPrompt || isIOS());
    $$('[data-install]').forEach((el) => { el.hidden = !show; });
  }

  function openInstallHelp() {
    const steps = isIOS()
      ? [
          'Mở trang này bằng <b>Safari</b> trên iPhone hoặc iPad.',
          'Nhấn nút <b>Chia sẻ</b> ⬆️ ở thanh công cụ phía dưới.',
          'Chọn <b>“Thêm vào Màn hình chính”</b>.',
          'Nhấn <b>“Thêm”</b> ở góc trên để hoàn tất.'
        ]
      : [
          'Mở menu <b>⋮</b> (Chrome) hoặc <b>⋯</b> (Edge) ở góc trên trình duyệt.',
          'Chọn <b>“Cài đặt ứng dụng”</b> hoặc <b>“Thêm vào màn hình chính”</b>.',
          'Nhấn <b>“Cài đặt”</b> để hoàn tất.'
        ];

    modalEl.innerHTML =
      '<div class="modal-card tone-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
        '<div class="modal-icon">📲</div>' +
        '<h3 class="modal-title" id="modal-title">Cài FlyersFC</h3>' +
        '<p class="modal-sub">Thêm ứng dụng ra màn hình chính để mở nhanh như app thật.</p>' +
        '<ol class="install-steps">' + steps.map((step) => '<li><span>' + step + '</span></li>').join('') + '</ol>' +
        '<p class="install-note">Nếu đang mở trong Zalo hoặc Facebook, hãy mở bằng Safari/Chrome trước nhé.</p>' +
        '<button class="modal-close" data-action="close-modal">Đã hiểu</button>' +
      '</div>';
    modalEl.hidden = false;
    const btn = modalEl.querySelector('.modal-close');
    if (btn) btn.focus();
  }

  async function promptInstall() {
    if (!installPrompt) {
      openInstallHelp();
      return;
    }
    const promptEvent = installPrompt;
    installPrompt = null;
    promptEvent.prompt();
    let choice = null;
    try { choice = await promptEvent.userChoice; } catch (err) { /* prompt dismissed */ }
    updateInstallUI();
    if (choice && choice.outcome === 'accepted') {
      confetti(18);
      sfx('win');
    }
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    updateInstallUI();
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    updateInstallUI();
    confetti(18);
    sfx('win');
  });

  const standaloneQuery = window.matchMedia('(display-mode: standalone)');
  if (standaloneQuery.addEventListener) standaloneQuery.addEventListener('change', updateInstallUI);

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => { /* offline cache unavailable */ });
    });
  }

  /* ---------- sound toggle ---------- */
  function updateSoundBtn() {
    const btn = $('#btn-sound');
    if (!btn) return;
    btn.textContent = app.soundOn ? '🔊' : '🔇';
    btn.setAttribute('aria-pressed', app.soundOn ? 'true' : 'false');
    btn.setAttribute('aria-label', app.soundOn ? 'Tắt âm thanh' : 'Bật âm thanh');
    btn.title = app.soundOn ? 'Tắt âm thanh' : 'Bật âm thanh';
  }

  function toggleSound() {
    app.soundOn = !app.soundOn;
    writeJSON(SOUND_KEY, app.soundOn);
    if (!app.soundOn && synth) synth.cancel();
    updateSoundBtn();
    if (app.soundOn) sfx('flip');
  }

  /* ---------- events ---------- */
  document.addEventListener('click', (e) => {
    const installEl = e.target.closest('[data-install]');
    if (installEl) {
      promptInstall();
      return;
    }

    const sayEl = e.target.closest('[data-say]');
    if (sayEl) {
      speak(sayEl.getAttribute('data-say'));
      return;
    }

    const levelEl = e.target.closest('[data-level]');
    if (levelEl) {
      openLevel(levelEl.getAttribute('data-level'));
      return;
    }

    const modeEl = e.target.closest('[data-mode]');
    if (modeEl) {
      const mode = modeEl.getAttribute('data-mode');
      if (!app.topic) return;
      if (mode === 'study') startStudy(app.topic);
      else startQuiz(app.topic);
      return;
    }

    const topicEl = e.target.closest('[data-topic]');
    if (topicEl) {
      openTopicModal(topicEl.getAttribute('data-topic'));
      return;
    }

    const answerEl = e.target.closest('[data-answer]');
    if (answerEl) {
      answerQuestion(Number(answerEl.getAttribute('data-answer')));
      return;
    }

    const markEl = e.target.closest('[data-mark]');
    if (markEl) {
      markCurrent(markEl.getAttribute('data-mark') === 'yes');
      return;
    }

    if (e.target.closest('[data-flip]')) {
      toggleFlash();
      return;
    }

    if (e.target.closest('[data-replay]')) {
      if (app.lastResult) startQuiz(app.lastResult.topic);
      return;
    }

    if (e.target.closest('[data-go-study]')) {
      if (app.lastResult) startStudy(app.lastResult.topic);
      return;
    }

    if (e.target.closest('[data-restudy]')) {
      if (app.topic) startStudy(app.topic);
      return;
    }

    if (e.target.closest('[data-go-quiz]')) {
      if (app.topic) startQuiz(app.topic);
      return;
    }

    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      const action = actionEl.getAttribute('data-action');
      if (action === 'home') goHome();
      else if (action === 'topics') {
        clearQuizTimer();
        if (synth) synth.cancel();
        app.study = null;
        app.quiz = null;
        app.topic = null;
        renderTopics();
        showScreen('topics');
      } else if (action === 'close-modal') {
        closeModal();
        app.topic = null;
      }
      return;
    }

    if (e.target.closest('.flashcard')) toggleFlash();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl && !modalEl.hidden) {
      closeModal();
      app.topic = null;
      return;
    }
    const card = e.target.closest && e.target.closest('.flashcard');
    if (card && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')) {
      e.preventDefault();
      toggleFlash();
    }
  });

  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      closeModal();
      app.topic = null;
    }
  });

  $('#btn-sound').addEventListener('click', toggleSound);
  $('#btn-home').addEventListener('click', goHome);

  /* ---------- init ---------- */
  function init() {
    LEVEL_KEYS.forEach((key) => {
      if (!VOCAB[key]) delete VOCAB[key];
    });
    updateSoundBtn();
    prepareVoices();
    renderHome();
    showScreen('home');
    updateInstallUI();
    registerServiceWorker();
  }

  init();
})();
