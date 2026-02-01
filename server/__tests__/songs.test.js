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

const app = require('../app');
const Song = require('../models/Song');

describe('Songs API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/songs', () => {
    it('returns 200 and list of songs', async () => {
      const mockSongs = [
        { id: 1, name: 'Song 1', youtubeUrl: 'https://youtube.com/watch?v=abc' },
        { id: 2, name: 'Song 2', youtubeUrl: 'https://youtube.com/watch?v=xyz' },
      ];
      Song.findAll.mockResolvedValue(mockSongs);

      const res = await request(app).get('/api/songs');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toEqual(mockSongs);
    });

    it('returns 500 on database error', async () => {
      Song.findAll.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/api/songs');

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/songs/artist/:artistId', () => {
    it('returns 200 and songs for an artist', async () => {
      const mockSongs = [
        { id: 1, name: 'Song 1', artistId: 1, youtubeUrl: 'https://youtube.com/watch?v=abc' },
      ];
      Song.findAll.mockResolvedValue(mockSongs);

      const res = await request(app).get('/api/songs/artist/1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockSongs);
    });

    it('returns empty array when artist has no songs', async () => {
      Song.findAll.mockResolvedValue([]);

      const res = await request(app).get('/api/songs/artist/999');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
      expect(res.body.data).toEqual([]);
    });
  });

  describe('GET /api/songs/:id', () => {
    it('returns 404 when song not found', async () => {
      Song.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/api/songs/999');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Song not found');
    });

    it('returns 200 and song when found', async () => {
      const mockSong = { id: 1, name: 'Song 1', youtubeUrl: 'https://youtube.com/watch?v=abc' };
      Song.findByPk.mockResolvedValue(mockSong);

      const res = await request(app).get('/api/songs/1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockSong);
    });
  });
});
