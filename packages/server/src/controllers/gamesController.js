import * as gamesService from '../services/gamesService.js';

const getGames = async (req, res, next) => {
  try {
    const {
      includeDeleted,
      search,
      isPopular,
      isFeatured,
      isArchived,
      isPublished,
      skip,
      take,
      orderBy,
      order
    } = req.query;

    const games = await gamesService.getGames({
      includeDeleted: includeDeleted === 'true',
      search,
      isPopular: isPopular === undefined ? undefined : isPopular === 'true',
      isFeatured: isFeatured === undefined ? undefined : isFeatured === 'true',
      isArchived: isArchived === undefined ? undefined : isArchived === 'true',
      isPublished: isPublished === undefined ? undefined : isPublished === 'true',
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy,
      order
    });

    res.json({ data: games });
  } catch (error) {
    next(error);
  }
};

const getGameById = async (req, res, next) => {
  try {
    const game = await gamesService.getGameById(req.params.id, {
      includeDeleted: req.query.includeDeleted === 'true'
    });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json({ data: game });
  } catch (error) {
    next(error);
  }
};

const createGame = async (req, res, next) => {
  try {
    const game = await gamesService.createGame(req.body);
    res.status(201).json({ data: game });
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  try {
    const game = await gamesService.updateGame(req.params.id, req.body);
    res.json({ data: game });
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const game = await gamesService.deleteGame(req.params.id, {
      hard: req.query.hard === 'true'
    });
    res.json({ data: game });
  } catch (error) {
    next(error);
  }
};

export {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};

export default {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};
