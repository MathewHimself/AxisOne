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
const productStory = document.querySelector('.product-story');

if (productFeatures.length && productStory) {
  const productMobileQuery = window.matchMedia('(max-width: 820px)');
  let productIndex = 0;
  let productWheelDelta = 0;
  let productLocked = false;
  let productTouchStart = 0;

  const setProductPage = (nextIndex) => {
    productIndex = Math.min(productFeatures.length - 1, Math.max(0, nextIndex));
    productFeatures.forEach((feature) => {
      const index = Number(feature.dataset.productIndex);

      feature.classList.toggle('is-active', index === productIndex);
      feature.classList.toggle('is-before', index < productIndex);
      feature.classList.toggle('is-after', index > productIndex);
      feature.classList.toggle('is-visible', index === productIndex);
      feature.setAttribute('aria-hidden', String(index !== productIndex));
    });
  };

  productFeatures.forEach((feature, index) => {
    feature.dataset.productIndex = String(index);
  });

  const isProductStoryInView = () => {
    const rect = productStory.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    return rect.top < viewportHeight * 0.24 && rect.bottom > viewportHeight * 0.76;
  };

  const flipProductPage = (direction) => {
    const nextIndex = productIndex + direction;

    if (nextIndex < 0 || nextIndex >= productFeatures.length || productLocked) {
      return false;
    }

    productLocked = true;
    productWheelDelta = 0;
    setProductPage(nextIndex);

    window.setTimeout(() => {
      productLocked = false;
    }, 1120);

    return true;
  };

  productStory.addEventListener(
    'wheel',
    (event) => {
      if (productMobileQuery.matches || !isProductStoryInView()) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const canFlip = productIndex + direction >= 0 && productIndex + direction < productFeatures.length;

      if (!canFlip) {
        return;
      }

      event.preventDefault();
      productWheelDelta += event.deltaY;

      if (Math.abs(productWheelDelta) < 42) {
        return;
      }

      flipProductPage(direction);
    },
    { passive: false }
  );

  productStory.addEventListener(
    'touchstart',
    (event) => {
      productTouchStart = event.touches[0]?.clientY || 0;
    },
    { passive: true }
  );

  productStory.addEventListener(
    'touchmove',
    (event) => {
      if (productMobileQuery.matches || !productTouchStart) {
        return;
      }

      const currentY = event.touches[0]?.clientY || productTouchStart;
      const diff = productTouchStart - currentY;

      if (Math.abs(diff) < 34) {
        return;
      }

      const direction = diff > 0 ? 1 : -1;
      const didFlip = flipProductPage(direction);

      if (didFlip) {
        event.preventDefault();
      }

      productTouchStart = 0;
    },
    { passive: false }
  );

  productMobileQuery.addEventListener('change', () => {
    if (productMobileQuery.matches) {
      setProductPage(0);
    }
  });

  setProductPage(0);
}

const companyCarousel = document.querySelector('[data-company-carousel]');
const companyTrack = document.querySelector('[data-company-track]');
const companyCases = document.querySelectorAll('[data-company-case]');

if (companyCarousel && companyTrack && companyCases.length) {
  const companyMobileQuery = window.matchMedia('(max-width: 900px)');
  const companyCenterOrder = Math.floor(companyCases.length / 2);
  let companyIndex = Number(companyCarousel.dataset.activeIndex) || 0;
  let companyWheelDelta = 0;
  let companyLocked = false;
  let companyTouchStartX = 0;
  let companyTouchStartY = 0;

  const updateCompanyOffset = () => {
    const active = companyCases[companyIndex];

    if (!active) {
      return;
    }

    if (companyMobileQuery.matches) {
      const activeCenter = active.offsetTop + active.offsetHeight / 2;
      const carouselCenter = companyCarousel.clientHeight / 2;
      const offset = carouselCenter - activeCenter;
      const leftOffset = (companyCarousel.clientWidth - companyTrack.offsetWidth) / 2;

      companyTrack.style.setProperty('--companies-offset', `${Math.round(leftOffset)}px`);
      companyTrack.style.setProperty('--companies-offset-y', `${Math.round(offset)}px`);
      companyTrack.style.transform = 'none';
      companyTrack.style.marginLeft = '0px';
      companyTrack.style.marginTop = '0px';
      companyTrack.style.left = `${Math.round(leftOffset)}px`;
      companyTrack.style.top = `${Math.round(offset)}px`;
      return;
    }

    const activeCenter = active.offsetLeft + active.offsetWidth / 2;
    const carouselCenter = companyCarousel.clientWidth / 2;
    const offset = carouselCenter - activeCenter;

    companyTrack.style.setProperty('--companies-offset', `${Math.round(offset)}px`);
    companyTrack.style.setProperty('--companies-offset-y', '0px');
    companyTrack.style.transform = 'none';
    companyTrack.style.marginLeft = '0px';
    companyTrack.style.marginTop = '0px';
    companyTrack.style.left = `${Math.round(offset)}px`;
    companyTrack.style.top = '0px';
  };

  const setCompanyCase = (nextIndex) => {
    companyIndex = (nextIndex + companyCases.length) % companyCases.length;

    companyCases.forEach((caseElement, index) => {
      const isActive = index === companyIndex;
      const circularOrder =
        (index - companyIndex + companyCenterOrder + companyCases.length) % companyCases.length;

      caseElement.classList.toggle('is-active', isActive);
      caseElement.classList.toggle('is-before', circularOrder < companyCenterOrder);
      caseElement.classList.toggle('is-after', circularOrder > companyCenterOrder);
      caseElement.style.order = String(circularOrder);
      caseElement.setAttribute('aria-hidden', String(!isActive));
    });

    window.requestAnimationFrame(updateCompanyOffset);
    window.setTimeout(updateCompanyOffset, 620);
    window.setTimeout(updateCompanyOffset, 980);
  };

  const flipCompanyCase = (direction) => {
    const nextIndex = companyIndex + direction;

    if (companyLocked) {
      return false;
    }

    companyLocked = true;
    companyWheelDelta = 0;
    setCompanyCase(nextIndex);

    window.setTimeout(() => {
      companyLocked = false;
    }, 820);

    return true;
  };

  companyCarousel.addEventListener(
    'wheel',
    (event) => {
      const rawDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const direction = rawDelta > 0 ? 1 : -1;
      const threshold = companyMobileQuery.matches ? 36 : 110;

      if (companyLocked) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      companyWheelDelta += rawDelta;

      if (Math.abs(companyWheelDelta) < threshold) {
        return;
      }

      flipCompanyCase(direction);
    },
    { passive: false }
  );

  companyCarousel.addEventListener(
    'touchstart',
    (event) => {
      companyTouchStartX = event.touches[0]?.clientX || 0;
      companyTouchStartY = event.touches[0]?.clientY || 0;
    },
    { passive: true }
  );

  companyCarousel.addEventListener(
    'touchmove',
    (event) => {
      if (!companyTouchStartX && !companyTouchStartY) {
        return;
      }

      const currentX = event.touches[0]?.clientX || companyTouchStartX;
      const currentY = event.touches[0]?.clientY || companyTouchStartY;
      const diffX = companyTouchStartX - currentX;
      const diffY = companyTouchStartY - currentY;
      const primaryDiff = companyMobileQuery.matches
        ? diffY
        : Math.abs(diffX) > Math.abs(diffY)
          ? diffX
          : diffY;

      if (Math.abs(primaryDiff) < 34) {
        return;
      }

      const didFlip = flipCompanyCase(primaryDiff > 0 ? 1 : -1);

      if (didFlip) {
        event.preventDefault();
      }

      companyTouchStartX = 0;
      companyTouchStartY = 0;
    },
    { passive: false }
  );

  companyMobileQuery.addEventListener('change', () => {
    setCompanyCase(companyIndex);
  });

  window.addEventListener('resize', updateCompanyOffset);

  setCompanyCase(companyIndex);
  window.setTimeout(updateCompanyOffset, 260);
  window.setTimeout(() => setCompanyCase(companyIndex), 1400);
}
