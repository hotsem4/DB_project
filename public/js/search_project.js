const searchBtn = document.getElementById('searchBtn');
const searchText = document.getElementById('searchText');

searchBtn.addEventListener('click', (event) => {
  console.log(searchText);
  event.preventDefault();
  const searchText_value = searchText.value;

  if (searchText_value === '프론트엔드') {
    window.location.href = `/${id}/search_projects`;
  } else {
    alert('검색 결과가 존재하지 않습니다.');
  }
});

function searchDataInput() {
  const req = {
    searchText: searchText.value,
  };
  console.log(req);
  fetch(`/${id}/search_projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert('검색 성공');
        const projectData = res.projectData;
        console.log(projectData);
        // location.href = `/${id}/search_project`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
