// tests/projectController.test.js
const request = require('supertest');
const app = require('../index'); // Assuming you export Express app from index.js
const Project = require('../models/projectSchema');

// Mocking the Project model
jest.mock('../models/projectSchema');


// tests/projectController.test.js
describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const newProject = {
        projectId: '2024CS101',
        name: 'Final Year Project',
        numberOfMembers: 3,
        year: 2024,
        emailsOfMembers: ['student1@example.com', 'student2@example.com'],
        department: 'CS',
        lectureName: 'Prof. Smith',
      };
  
      Project.prototype.save = jest.fn().mockResolvedValue(newProject); // Mock save method
  
      const res = await request(app)
        .post('/api/projects')
        .send(newProject);
  
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Project successfuly added to database');
    });
  
    it('should return 400 if required fields are missing', async () => {
      const incompleteProject = {
        name: 'Final Year Project',
        department: 'CS',
      };
  
      const res = await request(app)
        .post('/api/projects')
        .send(incompleteProject);
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Provide all project details');
    });
  });
  

  describe('POST /api/enroll', () => {
    it('should enroll student to project', async () => {
      const updatedProject = {
        name: 'Final Year Project',
        department: 'CS',
        emailsOfMembers: ['student1@example.com'],
      };
  
      Project.findOneAndUpdate.mockResolvedValue(updatedProject); // Mock findOneAndUpdate
  
      const res = await request(app)
        .post('/api/enroll')
        .send({ projectName: 'Final Year Project', department: 'CS', studentEmail: 'student2@example.com' });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Project updated successfully');
    });
  
    it('should return 400 if project not found', async () => {
      Project.findOneAndUpdate.mockResolvedValue(null);
  
      const res = await request(app)
        .post('/api/enroll')
        .send({ projectName: 'Unknown Project', department: 'CS', studentEmail: 'student@example.com' });
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'No project found for given details');
    });
  
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/enroll')
        .send({ projectName: 'Final Year Project' });
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Provide all relavent details');
    });
  });
  

  describe('DELETE /api/project', () => {
    it('should delete a project successfully', async () => {
      Project.deleteOne.mockResolvedValue({ deletedCount: 1 });
  
      const res = await request(app)
        .delete('/api/project')
        .send({ name: 'Final Year Project', department: 'CS' });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Project deleted successfully.');
    });
  
    it('should return 404 if no project is found', async () => {
      Project.deleteOne.mockResolvedValue({ deletedCount: 0 });
  
      const res = await request(app)
        .delete('/api/project')
        .send({ name: 'Unknown Project', department: 'CS' });
  
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Error when entrolling the project');
    });
  
    it('should return 404 if details are missing', async () => {
      const res = await request(app)
        .delete('/api/project')
        .send({ name: 'Final Year Project' });
  
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Fill all the details');
    });
  });
  


  describe('GET /api/project', () => {
    it('should return a project successfully', async () => {
      const mockProject = {
        name: 'Final Year Project',
        emailsOfMembers: ['student1@example.com'],
      };
  
      Project.findOne.mockResolvedValue(mockProject);
  
      const res = await request(app)
        .get('/api/project')
        .send({ email: 'student1@example.com' });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Project found successfully');
    });
  
    it('should return 404 if no project is found', async () => {
      Project.findOne.mockResolvedValue(null);
  
      const res = await request(app)
        .get('/api/project')
        .send({ email: 'unknown@example.com' });
  
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'No project found for the given email');
    });
  
    it('should return 404 if email is missing', async () => {
      const res = await request(app)
        .get('/api/project')
        .send({});
  
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Pass email');
    });
  });
  
