const removeBtn = document.getElementById('projectRemoveBtn');
const supportBtn = document.getElementById('projectSupportBtn');

if (removeBtn !== null) {
  removeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const confirmDelete = confirm(`정말 프로젝트를 삭제하시겠습니까?`);

    if (confirmDelete) {
      deleteProject(projectId);
    }
  });
}

if (supportBtn !== null) {
  supportBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const userInput = prompt('하고 싶은 역할을 간단하게 입력해주세요 : ');
    console.log(userInput);
    const confirmSupport = confirm('프로젝트에 지원하시겠습니까?');

    if (confirmSupport) {
      supportProject(projectId, userInput);
    }
  });
}

function supportProject(projectId, userInput) {
  const userId = localStorage.getItem('userId');
  const req = {
    projectId: projectId,
    id: userId,
    role: userInput,
  };
  fetch(`./${projectId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert(`
        지원이 완료되었습니다.
        연락을 기다려주세요.`);
      } else {
        alert(res.msg);
      }
    })
    .catch((error) => {
      console.log('프로젝트 지원 중 오류 발생');
    });
}

function deleteProject(projectId) {
  const req = {
    projectId: projectId,
  };
  const userId = localStorage.getItem('userId');
  fetch(`../${userId}/${projectId}/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert('삭제가 완료되었습니다.');
        location.href = `/${userId}`;
      } else {
        alert(res.msg);
      }
    })
    .catch((error) => {
      console.log('프로젝트 삭제 중 오류 발생');
    });
}
