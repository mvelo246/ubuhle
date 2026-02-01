const request = require('supertest');

// Mock database
jest.mock('../config/database', () => {
  const createMockModel = () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
    reload: jest.fn(),
    belongsTo: jest.fn(),
    hasMany: jest.fn(),
    hasOne: jest.fn(),
    prototype: {},
  });
  return {
    sequelize: {
      define: jest.fn(createMockModel),
    },
    connectDB: jest.fn().mockResolvedValue(undefined),
  };
});

jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  prototype: { matchPassword: jest.fn() },
}));

jest.mock('../models/Artist', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  hasMany: jest.fn(),
  belongsTo: jest.fn(),
}));

jest.mock('../models/Song', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  belongsTo: jest.fn(),
  hasMany: jest.fn(),
}));

jest.mock('../models/Event', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  belongsTo: jest.fn(),
  hasMany: jest.fn(),
}));

jest.mock('../models/Model', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  belongsTo: jest.fn(),
  hasMany: jest.fn(),
}));

const app = require('../app');
const Model = require('../models/Model');

describe('Models API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/models', () => {
    it('returns 200 and list of models', async () => {
      const mockModels = [
        { id: 1, name: 'Model 1', image: '/img1.jpg', bio: 'Bio 1' },
        { id: 2, name: 'Model 2', image: '/img2.jpg', bio: 'Bio 2' },
      ];
      Model.findAll.mockResolvedValue(mockModels);

      const res = await request(app).get('/api/models');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toEqual(mockModels);
    });

    it('returns empty array when no models exist', async () => {
      Model.findAll.mockResolvedValue([]);

      const res = await request(app).get('/api/models');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
      expect(res.body.data).toEqual([]);
    });

    it('returns 500 on database error', async () => {
      Model.findAll.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/api/models');

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('DB Error');
    });
  });

  describe('GET /api/models/:id', () => {
    it('returns 404 when model not found', async () => {
      Model.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/api/models/999');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Model not found');
    });

    it('returns 200 and model when found', async () => {
      const mockModel = {
        id: 1,
        name: 'Model 1',
        image: '/img1.jpg',
        bio: 'Professional model',
        gallery: ['img1.jpg', 'img2.jpg'],
      };
      Model.findByPk.mockResolvedValue(mockModel);

      const res = await request(app).get('/api/models/1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockModel);
      expect(res.body.data.gallery).toHaveLength(2);
    });

    it('returns 500 on database error', async () => {
      Model.findByPk.mockRejectedValue(new Error('Connection lost'));

      const res = await request(app).get('/api/models/1');

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });
});
