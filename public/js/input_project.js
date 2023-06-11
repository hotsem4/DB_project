const inputProjectBtn = document.getElementById('projectEnrollBtn'),
  projectName = document.getElementById('projectName'),
  projectInfo = document.getElementById('content'),
  recruitmentStart = document.getElementById('recruitmentStart'),
  recruitmentEnd = document.getElementById('recruitmentEnd'),
  projectStart = document.getElementById('projectStart'),
  projectEnd = document.getElementById('projectEnd'),
  recruitmentNumber = document.getElementById('recruitmentNumber'),
  devEnv = document.getElementById('devEnv'),
  majorLang1 = document.getElementById('majorLang1'),
  majorLang2 = document.getElementById('majorLang2'),
  majorLang3 = document.getElementById('majorLang3'),
  projectEnrollBtn = document.getElementById('projectEnrollBtn'),
  recru_stat = document.getElementById('recru_stat'),
  dev_stat = document.getElementById('dev_stat'),
  recru_stat_value = recru_stat.options[recru_stat.selectedIndex].value,
  dev_stat_value = dev_stat.options[dev_stat.selectedIndex].value,
  writer_id = writer;

projectEnrollBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(writer_id);
  if (projectName.value === '') {
    alert('프로젝트 제목을 입력해 주세요.');
    return;
  }
  if (projectInfo.value === '') {
    alert('프로젝트 내용을 입력해 주세요.');
    return;
  }
  if (recruitmentNumber.value === 0) {
    alert('프로젝트 목표 참여 인원을 입력해 주세요.');
    return;
  }
  if (new Date(recruitmentEnd.value) <= new Date(recruitmentStart.value)) {
    alert('종료일자가 시작일자보다 늦을 수는 없습니다.');
    return;
  }
  if (new Date(projectEnd.value) <= new Date(projectStart.value)) {
    alert('종료일자가 시작일자보다 늦을 수는 없습니다.');
    return;
  }
  if (devEnv.value === '') {
    alert('프로젝트 개발 환경을 입력해 주세요.');
    return;
  }
  if (majorLang1.value === '') {
    alert('프로젝트 주력 언어를 입력해 주세요.');
    return;
  }
  insert_project_db();
});

function insert_project_db() {
  const req = {
    project_name: projectName.value,
    project_info: projectInfo.value,
    recruitment_start: recruitmentStart.value,
    recruitment_end: recruitmentEnd.value,
    project_start: projectStart.value,
    project_end: projectEnd.value,
    recruitment_number: recruitmentNumber.value,
    dev_env: devEnv.value,
    major_lang1: majorLang1.value,
    major_lang2: majorLang2.value,
    major_lang3: majorLang3.value,
    recru_stat: recru_stat_value,
    dev_stat: dev_stat_value,
    writer_id: writer_id,
  };
  console.log(req);

  if (majorLang2 === '') {
    req.majorLang2 = null;
    req.majorLang3 = null;
  }
  if (majorLang3 === '') {
    req.majorLang3 = null;
  }

  const userId = localStorage.getItem('userId');

  fetch(`../${id}/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        const userId = localStorage.getItem('userId');
        alert('프로젝트 등록에 성공하셨습니다.');
        location.href = `/${userId}/${res.projectId}`;
      } else {
        alert(res.msg);
      }
    })
    .catch((error) => {
      console.log('프로젝트 등록 중 오류 발생');
    });
}
