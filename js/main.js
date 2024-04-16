const frame = document.querySelector('section'); // 섹션 요소를 변수에 할당
const list = frame.querySelectorAll('article'); // 섹션 내의 모든 아티클 요소를 리스트로 저장
const prev = document.querySelector('.btnPrev'); // 이전 버튼 요소를 변수에 할당
const next = document.querySelector('.btnNext'); // 다음 버튼 요소를 변수에 할당
const names = ['Blizzards', 'Calm', 'Dusty_Road', 'Escape', 'Payday', 'Retreat', 'Seasonal', 'Vespers']; // 이미지와 오디오 파일 이름을 배열에 저장
const len = list.length; // 아티클 리스트의 길이를 저장
const deg = 360 / len; // 각 아티클이 회전할 각도를 계산
let num = 0; // 현재 회전 각도를 저장하는 변수
let active = 0; // 활성 아티클의 인덱스를 저장하는 변수

// 각 아티클에 대한 초기 설정 및 이미지, 텍스트, 오디오 추가
names.forEach((name, index) => {
  const pic = list[index].querySelector('.pic'); // 각 아티클 내의 이미지 요소 선택
  const h2 = list[index].querySelector('.txt h2'); // 각 아티클 내의 텍스트 요소 선택

  // 각 아티클을 회전하고 화면 밖으로 이동시킴
  list[index].style.transform = `rotate(${deg * index}deg) translateY(-100vh)`;
  pic.style.backgroundImage = `url(/img/${name}.jpg)`; // 이미지에 배경 이미지 설정
  h2.innerText = name; // 텍스트에 아티클 이름 설정

  const audio = document.createElement('audio'); // 오디오 요소 생성
  audio.setAttribute('src', `/music/${name}.mp3`); // 오디오 소스 설정
  audio.setAttribute('loop', 'loop'); // 오디오 반복 재생 설정
  list[index].append(audio); // 각 아티클에 오디오 요소 추가
});

// 이전 버튼 클릭 시 이벤트 처리
prev.addEventListener('click', e => {
  frame.style.transform = `rotate(${deg * ++num}deg)`; // 섹션을 이전 각도로 회전

  // 활성 아티클 인덱스 변경
  (active === 0) ? active = len - 1 : active--;
  
  // 활성 아티클 클래스 설정
  for (let el of list) el.classList.remove('on');
  list[active].classList.add('on');
});

// 다음 버튼 클릭 시 이벤트 처리
next.addEventListener('click', e => {
  frame.style.transform = `rotate(${deg * --num}deg)`; // 섹션을 다음 각도로 회전

  // 활성 아티클 인덱스 변경
  (active === len - 1) ? active = 0 : active++;
  
  // 활성 아티클 클래스 설정
  for (let el of list) el.classList.remove('on');
  list[active].classList.add('on');
});

// 각 아티클의 재생, 일시정지, 로드 버튼 클릭 시 이벤트 처리
for (let el of list) {
  const play = el.querySelector('.play'); // 재생 버튼 선택
  const pause = el.querySelector('.pause'); // 일시정지 버튼 선택
  const load = el.querySelector('.load'); // 로드 버튼 선택

  // 재생 버튼 클릭 시 이벤트 처리
  play.addEventListener('click', e => {
    e.currentTarget.closest('article').querySelector('.pic').classList.add('on'); // 이미지에 on 클래스 추가
    e.currentTarget.closest('article').querySelector('audio').play(); // 오디오 재생
  });

  // 일시정지 버튼 클릭 시 이벤트 처리
  pause.addEventListener('click', e => {
    e.currentTarget.closest('article').querySelector('.pic').classList.remove('on'); // 이미지에서 on 클래스 제거
    e.currentTarget.closest('article').querySelector('audio').pause(); // 오디오 일시정지
  });

  // 로드 버튼 클릭 시 이벤트 처리
  load.addEventListener('click', e => {
    const article = e.currentTarget.closest('article'); // 클릭한 버튼이 속한 아티클 요소 선택
    const pic = article.querySelector('.pic'); // 아티클 내의 이미지 요소 선택
    const audio = article.querySelector('audio'); // 아티클 내의 오디오 요소 선택

    pic.classList.add('on'); // 이미지에 on 클래스 추가
    audio.load(); // 오디오 로드
    audio.play(); // 오디오 재생
  });
}