'use strict';

/** @type {import('sequelize-cli').Migration} */
const TABLE_NAME = "Videos"
const VideoDataSeed = [
  {
    title: "Kung Fu Panda",
    year: 2008,
    poster: "https://m.media-amazon.com/images/M/MV5BODJkZTZhMWItMDI3Yy00ZWZlLTk4NjQtOTI1ZjU5NjBjZTVjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    director: "Mark Osborne",
    casts: "Jack Black, Jackie Chen",
    genre: "Action, Comedy"
  },
  {
    title: "Kung Fu Panda 2",
    year: 2011,
    poster: "https://m.media-amazon.com/images/M/MV5BYzQ0ZWIxZjAtYWI3Yy00MGM0LWFjOGYtNzcyYThiOTA3ODI1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    director: "Jennifer Yuh Nelson",
    casts: "Jack Black, Jackie Chen",
    genre: "Action, Comedy"
  },
  {
    title: "Kung Fu Panda 3",
    year: 2016,
    poster: "https://m.media-amazon.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_SX300.jpg",
    director: "Alessandro Carloni",
    casts: "Jack Black, Jackie Chen",
    genre: "Action, Comedy"
  },
  {
    title: "Harry Potter and the Deathly Hallows: Part 2",
    year: 2011,
    poster: "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    director: "David Yates",
    casts: "Daniel Radcliffe, Emma Watson",
    genre: "Fantasy, Mistery"
  },
  {
    title: "Harry Potter and the Sorcerers Stone",
    year: 2001,
    poster: "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
    director: "Chris Columbus",
    casts: "Daniel Radcliffe, Emma Watson",
    genre: "Fantasy, Mistery"
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    year: 2002,
    poster: "https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg",
    director: "Chris Columbus",
    casts: "Daniel Radcliffe, Emma Watson",
    genre: "Fantasy, Mistery"
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    year: 2004,
    poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
    director: "Alfonso Cuarón",
    casts: "Daniel Radcliffe, Emma Watson",
    genre: "Fantasy, Mistery"
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    year: 2005,
    poster: "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg",
    director: "Mike Newell",
    casts: "Daniel Radcliffe, Emma Watson",
    genre: "Fantasy, Mistery"
  }

]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all(VideoDataSeed.map(data => {
      return queryInterface.sequelize.query(
        `INSERT INTO "${TABLE_NAME}"
        (title, year, poster, director, casts, genre, created_at, updated_at) VALUES
        ('${data.title}',
        ${data.year},
        '${data.poster}',
        '${data.director}',
        '${data.casts}',
        '${data.genre}',
        NOW(), NOW())`
      )
    }))
  },

  async down (queryInterface, Sequelize) {
    const truncateQuery = `TRUNCATE TABLE "${TABLE_NAME}" RESTART IDENTITY CASCADE;`;
    await queryInterface.sequelize.query(truncateQuery);
  }
};
