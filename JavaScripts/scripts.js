const askForm = document.querySelector('.ask-bar');
const askInput = document.querySelector('.ask-bar__input');
const promptChips = document.querySelectorAll('.prompt-chip');
const emailForm = document.querySelector('.email-buttons');
const emailInput = document.querySelector('.email-input');
const emailButton = document.querySelector('.try-buton');

if (askForm && askInput) {
  promptChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      askInput.value = chip.textContent.trim();
      askInput.focus();
    });
  });

  askForm.addEventListener('submit', (event) => {
    event.preventDefault();
    askInput.focus();
  });
}

if (emailForm && emailInput && emailButton) {
  const defaultButtonText = emailButton.textContent;

  emailForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!emailInput.checkValidity() || !emailInput.value.trim()) {
      emailInput.focus();
      emailInput.reportValidity();
      return;
    }

    emailButton.textContent = 'отправлено';
    emailInput.value = '';

    window.setTimeout(() => {
      emailButton.textContent = defaultButtonText;
    }, 1800);
  });
}

const ceoThinking = document.querySelector('.ceo-thinking');

if (ceoThinking) {
  const revealCeoThinking = () => {
    ceoThinking.classList.add('is-visible');
  };

  if ('IntersectionObserver' in window) {
    const ceoObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealCeoThinking();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.25,
      }
    );

    ceoObserver.observe(ceoThinking);
  } else {
    revealCeoThinking();
  }
}

const scenarioData = {
  market: {
    name: 'Михаил',
    question: 'У меня сеть из 12 кофеен. Рост остановился, что делать?',
    answer:
      'Когда Starbucks столкнулась с такой же проблемой, Говард Шульц инвестировал в цифровую экосистему вместо открытия новых точек.',
  },
  crisis: {
    name: 'Максим',
    question: 'Продажи упали на 30% за последние два месяца. Как выйти из кризиса?',
    answer:
      'Когда Apple столкнулась с падением спроса, Стив Джобс сфокусировался на ключевых продуктах вместо расширения линейки. Иногда рост начинается с сокращения лишнего.',
  },
  competitor: {
    name: 'Артём',
    question: 'На рынок вышел крупный конкурент с ценами ниже наших. Что делать?',
    answer:
      'Когда Netflix столкнулся с Disney+, компания не пошла в ценовую войну. Вместо этого они инвестировали в уникальный контент и удержание аудитории.',
  },
  ceo: {
    name: 'Сергей',
    question: 'Компания выросла до 100 сотрудников. Пора ли нанимать CEO?',
    answer:
      'Когда Google начала быстро масштабироваться, основатели пригласили Эрика Шмидта для усиления управления. Иногда следующий этап роста требует нового лидера.',
  },
  custom: {
    name: 'Никита',
    question: 'Мы растем, но постоянно упираемся в операционные проблемы. Как масштабироваться дальше?',
    answer:
      'Когда Amazon столкнулась с этим вызовом, Джефф Безос начал системно автоматизировать процессы и строить инфраструктуру на годы вперед.',
  },
};

const scenarioTabs = document.querySelectorAll('.scenario-tab');
const scenarioName = document.querySelector('[data-scenario-name]');
const scenarioQuestion = document.querySelector('[data-scenario-question]');
const scenarioAnswer = document.querySelector('[data-scenario-answer]');

if (scenarioTabs.length && scenarioName && scenarioQuestion && scenarioAnswer) {
  scenarioTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const scenario = scenarioData[tab.dataset.scenario];

      if (!scenario) {
        return;
      }

      scenarioTabs.forEach((button) => {
        const isActive = button === tab;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
      });

      scenarioName.textContent = scenario.name;
      scenarioQuestion.textContent = scenario.question;
      scenarioAnswer.textContent = scenario.answer;
    });
  });
}

const gameLevelButtons = document.querySelectorAll('.game-level');
const gameIcons = document.querySelectorAll('[data-game-icon]');
const gameStats = document.querySelectorAll('[data-game-stat]');

const gameStates = [
  {
    icons: 3,
    fills: [34, 41, 28, 37],
    values: [3400, 4100, 2800, 3700],
    xp: ['+840xp', '+1260xp', '+970xp', '+1130xp'],
  },
  {
    icons: 6,
    fills: [68, 74, 61, 70],
    values: [6800, 7400, 6100, 7000],
    xp: ['+2180xp', '+2940xp', '+2310xp', '+2680xp'],
  },
  {
    icons: 10,
    fills: [100, 100, 100, 100],
    values: [10000, 10000, 10000, 10000],
    xp: ['+∞xp', '+∞xp', '+∞xp', '+∞xp'],
  },
];

const setGameLevel = (levelIndex) => {
  const state = gameStates[levelIndex] || gameStates[0];

  gameLevelButtons.forEach((button, index) => {
    const isActive = index === levelIndex;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  gameIcons.forEach((icon, index) => {
    icon.classList.toggle('is-active', index < state.icons);
  });

  gameStats.forEach((stat, index) => {
    const fill = stat.querySelector('[data-game-fill]');
    const current = stat.querySelector('[data-game-current]');
    const xp = stat.querySelector('[data-game-xp]');

    if (fill) {
      fill.style.width = `${state.fills[index] || 0}%`;
    }

    if (current) {
      current.textContent = state.values[index] || 0;
    }

    if (xp) {
      xp.textContent = state.xp[index] || '';
    }
  });
};

if (gameLevelButtons.length && gameIcons.length && gameStats.length) {
  gameLevelButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setGameLevel(Number(button.dataset.gameLevel));
    });
  });

  setGameLevel(0);
}

const productFeatures = document.querySelectorAll('[data-product-feature]');

if (productFeatures.length) {
  const productMobileQuery = window.matchMedia('(max-width: 820px)');

  const updateProductProgress = () => {
    if (productMobileQuery.matches) {
      productFeatures.forEach((feature) => {
        feature.style.setProperty('--product-progress', '1');
        feature.classList.add('is-visible');
      });
      return;
    }

    productFeatures.forEach((feature) => {
      const rect = feature.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.98;
      const end = viewportHeight * 0.08;
      const rawProgress = (start - rect.top) / (start - end);
      const progress = Math.min(1, Math.max(0, rawProgress));

      feature.style.setProperty('--product-progress', progress.toFixed(3));

      if (progress > 0.22) {
        feature.classList.add('is-visible');
      }
    });
  };

  updateProductProgress();
  window.addEventListener('scroll', updateProductProgress, { passive: true });
  window.addEventListener('resize', updateProductProgress);
  productMobileQuery.addEventListener('change', updateProductProgress);
}
