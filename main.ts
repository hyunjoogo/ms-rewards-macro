import {generate} from 'random-words';

const checkbox = document.getElementById('mobileCheckbox') as HTMLInputElement
const button = document.getElementById('startButton') as HTMLButtonElement
const browser = document.getElementById('browser') as HTMLHeadingElement
const counterText = document.getElementById('counter') as HTMLHeadingElement
const statusText = document.getElementById('statusText') as HTMLSpanElement

let MOBILE = isMobile()
let isStart = false

if (MOBILE) {
  browser.textContent = 'MOBILE BROWSER';
} else {
  browser.textContent = 'NOT A MOBILE BROWSER';
}



if (isMobile()) {
  checkbox.checked = true;
}
checkbox.addEventListener('change', () => {
  MOBILE = checkbox.checked
});

button.addEventListener('click', () => {
  if (isStart) {
    isStart = false
  } else {
    isStart = true
    statusText.textContent = 'Loading...';
    main()
  }
});

const main = () => {



  const iframe = document.getElementById('frame') as HTMLIFrameElement;
  let counter = 0;
  let intervalId: number;

  const randomText = () => {
    const wordCount = Math.floor(Math.random() * 10) + 1;
    return generate({exactly: wordCount, join: ' '})
  }

  const func = () => {
    const searchString = randomText();
    const MAX_COUNTER = MOBILE ? 20 : 30
    if (MOBILE) {
      handleOpenNewTab(searchString)
    } else {
      iframe.src = `https://www.bing.com/search?q=${searchString}&PC=U316&FORM=CHROMN`;
    }
    counter++;
    counterText.textContent = `counter: ${counter}`;

    if (!isStart) {
      clearInterval(intervalId);
      counterText.textContent = `STOP: ${counter}`;
      statusText.textContent = '시작';
      isStart = false
    }

    if (counter === MAX_COUNTER) {
      clearInterval(intervalId);
      counterText.textContent = `FINISHED: ${counter}`;
      statusText.textContent = '시작';
      isStart = false
    }
  }

  intervalId = setInterval(func, 8000) as any;
}

function isMobile(): boolean {
  const userAgent: string = navigator.userAgent || navigator.vendor || (window as any).opera;

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return true;
  }

  // Android detection
  if (/android/i.test(userAgent)) {
    return true;
  }

  // Other mobile detection (including Windows Phone)
  return /Mobile|mini|Fennec|BlackBerry|BB10|webOS|IEMobile|Opera Mini/i.test(userAgent);
}


const handleOpenNewTab = (searchString: string) => {
  const newTab = window.open(`https://www.bing.com/search?q=${searchString}&form=QBLH&sp=-1&ghc=1&lq=0&pq=${searchString}&sc=11-2&qs=n&sk=&cvid=A6E74DC45AB840E4B0A3F9110B948B6B&ghsh=0&ghacc=0&ghpl=`, '_blank');

  // Close the tab after 1 second
  setTimeout(() => {
    newTab?.close();
  }, 1500);
};