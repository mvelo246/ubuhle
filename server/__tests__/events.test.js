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

const app = require('../app');
const Event = require('../models/Event');

describe('Events API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/events', () => {
    it('returns 200 and list of events', async () => {
      const mockEvents = [
        { id: 1, title: 'Event 1', date: '2025-10-29', status: 'upcoming' },
        { id: 2, title: 'Event 2', date: '2024-09-15', status: 'past' },
      ];
      Event.findAll.mockResolvedValue(mockEvents);

      const res = await request(app).get('/api/events');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toEqual(mockEvents);
    });

    it('returns 500 on database error', async () => {
      Event.findAll.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/api/events');

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/events/upcoming', () => {
    it('returns 200 and only upcoming events', async () => {
      const mockEvents = [
        { id: 1, title: 'Upcoming Event', date: '2025-10-29', status: 'upcoming' },
      ];
      Event.findAll.mockResolvedValue(mockEvents);

      const res = await request(app).get('/api/events/upcoming');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockEvents);
    });
  });

  describe('GET /api/events/past', () => {
    it('returns 200 and only past events', async () => {
      const mockEvents = [
        { id: 4, title: 'Past Event', date: '2024-09-15', status: 'past' },
      ];
      Event.findAll.mockResolvedValue(mockEvents);

      const res = await request(app).get('/api/events/past');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockEvents);
    });
  });

  describe('GET /api/events/:id', () => {
    it('returns 404 when event not found', async () => {
      Event.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/api/events/999');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Event not found');
    });

    it('returns 200 and event when found', async () => {
      const mockEvent = { id: 1, title: 'Event 1', date: '2025-10-29', status: 'upcoming' };
      Event.findByPk.mockResolvedValue(mockEvent);

      const res = await request(app).get('/api/events/1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockEvent);
    });
  });
});
