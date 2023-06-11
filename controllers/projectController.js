import db from '../config/db';
const Project = require('../models/Project');

export const handleProject = (req, res) => {
  console.log('handleProject');
  res.render('input_project', { id: req.params.id });
};

export const handleProjectSearch_demo = (req, res) => {
  res.render('search_projects', { id: req.params.id });
};

export const handleFindProject = (req, res) => {
  const query = `SELECT p.*, 
  (SELECT COUNT(*) FROM User_Projects up WHERE up.project_id = p.project_id) AS volunteer_count
FROM Project p;`;

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ err: '데이터를 불러오는 중 오류가 발생하였습니다.' });
    }
    console.log('Results:', results);

    if (!results || results.length === 0) {
      console.log('No results found');
      return res.status(404).json({ err: '프로젝트를 찾을 수 없습니다.' });
    }

    const projectData = results;
    console.log('Project Data:', projectData);

    const project_start = new Date(projectData.project_start);
    const project_end = new Date(projectData.project_end);
    const recru_start = new Date(projectData.recruitment_start);
    const recru_end = new Date(projectData.recruitment_end);

    // Date formatting
    results.forEach((result) => {
      result.recruitment_start = result.recruitment_start
        .toISOString()
        .split('T')[0];
      result.recruitment_end = result.recruitment_end
        .toISOString()
        .split('T')[0];
      result.project_start = result.project_start.toISOString().split('T')[0];
      result.project_end = result.project_end.toISOString().split('T')[0];
    });

    res.render('find_projects', {
      id: req.params.id,
      projectData: results,
    });
  });
};

export const hanleUpdateProjectInfo = (req, res) => {
  const projectId = req.params.project_id;

  const query = `SELECT * FROM Project WHERE project_id = ?;`;

  db.query(query, [projectId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ err: '데이터를 가져오는 중 오류가 발생하였습니다.' });
    }

    console.log('Results:', results);

    if (!results || results.length === 0) {
      console.log('No results found');
      return res.status(404).json({ err: '프로젝트를 찾을 수 없습니다.' });
    }

    const projectData = results[0];
    console.log('Project Data:', projectData);

    if (!projectData.recruitment_start || !projectData.recruitment_end) {
      console.log('Recruitment start or end is missing');
      return res.status(500).json({ err: '데이터가 올바르지 않습니다.' });
    }

    const project_start = new Date(projectData.project_start);
    const project_end = new Date(projectData.project_end);
    const recru_start = new Date(projectData.recruitment_start);
    const recru_end = new Date(projectData.recruitment_end);

    // Date formatting
    results[0].recruitment_start = recru_start.toISOString().split('T')[0];
    results[0].recruitment_end = recru_end.toISOString().split('T')[0];
    results[0].project_start = project_start.toISOString().split('T')[0];
    results[0].project_end = project_end.toISOString().split('T')[0];

    res.render('update_project', {
      id: req.params.id,
      projectId: projectId,
      projectData: results[0],
    });
  });
};

export const handleProjectInfo = (req, res) => {
  const projectId = req.params.project_id;

  const query = `SELECT p.*, 
  (SELECT COUNT(*) FROM User_Projects up WHERE up.project_id = p.project_id) AS volunteer_count
FROM Project p
WHERE p.project_id = ?;
`;

  const userProjectQuery = `
  SELECT up.id, u.phone_number
  FROM User_Projects up
  INNER JOIN User u ON up.id = u.id
  WHERE up.project_id = ?;
`;

  db.query(query, [projectId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ err: '데이터를 가져오는 중 오류가 발생하였습니다.' });
    }

    console.log('Results:', results);

    if (!results || results.length === 0) {
      console.log('No results found');
      return res.status(404).json({ err: '프로젝트를 찾을 수 없습니다.' });
    }

    const projectData = results[0];
    console.log('Project Data:', projectData);

    if (!projectData.recruitment_start || !projectData.recruitment_end) {
      console.log('Recruitment start or end is missing');
      return res.status(500).json({ err: '데이터가 올바르지 않습니다.' });
    }
    console.log(results[0]);
    const project_start = new Date(projectData.project_start);
    const project_end = new Date(projectData.project_end);
    const recru_start = new Date(projectData.recruitment_start);
    const recru_end = new Date(projectData.recruitment_end);
    const timeDifference = recru_end - recru_start;
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
    const projectDayDifference =
      (project_end - project_start) / (1000 * 60 * 60 * 24);

    // Date formatting
    results[0].recruitment_start = recru_start.toISOString().split('T')[0];
    results[0].recruitment_end = recru_end.toISOString().split('T')[0];
    results[0].project_start = project_start.toISOString().split('T')[0];
    results[0].project_end = project_end.toISOString().split('T')[0];

    db.query(userProjectQuery, [projectId], (err, userProjectResults) => {
      if (err) {
        return res
          .status(500)
          .json({ err: 'Error retrieving user project information.' });
      }

      const userProjectData = userProjectResults || [];
      console.log(userProjectData);

      res.render('project_info', {
        id: req.params.id,
        projectId: req.params.project_id,
        projectData: results[0],
        userProjectData: userProjectData,
        dayDifference: dayDifference,
        projectDayDifference: projectDayDifference,
      });
    });
  });
};

export const projectInputProcess = {
  inputProject: async (req, res) => {
    console.log('projectController req: ');
    console.log(req);
    const project = new Project(req.body);
    const response = await project.input_projectDate();
    return res.json(response);
  },
};

export const projectUpdateProcess = {
  updateProject: async (req, res) => {
    const project = new Project(req.body);
    const response = await project.update_projectDate();
    return res.json(response);
  },
};

export const projectSupportProcess = {
  supportProject: async (req, res) => {
    const project = new Project(req.body);
    const response = await project.support_project();
    return res.json(response);
  },
};

export const projectSearchProcess = {
  searchProject: async (req, res) => {
    const project = new Project(req.body);
    const response = await project.search_projectDate();
    const projectData = response.projectData;

    projectData.forEach((result) => {
      result.recruitment_start = result.recruitment_start
        .toISOString()
        .split('T')[0];
      result.recruitment_end = result.recruitment_end
        .toISOString()
        .split('T')[0];
      result.project_start = result.project_start.toISOString().split('T')[0];
      result.project_end = result.project_end.toISOString().split('T')[0];
    });
    response.projectData = projectData;

    console.log('*****************');
    console.log(response);
    console.log('*****************');

    return res.json(response);
  },
};

export const handleProjectDelete = (req, res) => {
  const projectId = req.params.project_id;

  const query = `DELETE FROM \`bulidRunMate\`.\`Project\` WHERE (\`project_id\` = ?);`;

  db.query(query, [projectId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: '삭제 중 오류가 발생하였습니다.' });
    }

    return res.json({ success: true });
  });
};

export const handleProjectSearch = (req, res) => {
  const searchText = req.params.searchText;
  console.log(searchText);
  const query = `SELECT p.*,
      (SELECT COUNT(*) FROM User_Projects up WHERE up.project_id = p.project_id) AS volunteer_count
      FROM Project p
      WHERE p.writer_id LIKE '%?%'
      OR p.project_info LIKE '%?%'
      OR p.project_name LIKE '%?%';
    `;

  db.query(query, [searchText, searchText, searchText], (err, results) => {
    console.log(searchText);
    if (err) {
      return res
        .status(500)
        .json({ err: '데이터를 불러오는 중 오류가 발생하였습니다.' });
    }
    console.log('Results:', results);

    if (!results || results.length === 0) {
      console.log('No results found');
      return res.status(404).json({ err: '프로젝트를 찾을 수 없습니다.' });
    }

    const projectData = results;
    console.log('Project Data:', projectData);

    const project_start = new Date(projectData.project_start);
    const project_end = new Date(projectData.project_end);
    const recru_start = new Date(projectData.recruitment_start);
    const recru_end = new Date(projectData.recruitment_end);

    // Date formatting
    results.forEach((result) => {
      result.recruitment_start = result.recruitment_start
        .toISOString()
        .split('T')[0];
      result.recruitment_end = result.recruitment_end
        .toISOString()
        .split('T')[0];
      result.project_start = result.project_start.toISOString().split('T')[0];
      result.project_end = result.project_end.toISOString().split('T')[0];
    });

    res.render('find_projects', {
      id: req.params.id,
      searchText: searchText,
      projectData: results,
    });
  });
};
