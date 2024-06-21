type Movie = {
  id: number;
  title: string;
  duration: number; // Diperbaiki menjadi number
  director: string;
  actors: string[];
  producedBy: string;
  releaseDate: Date;
  genre: string[];
};

export const dataMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    duration: 148,
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy"],
    producedBy: "Warner Bros.",
    releaseDate: new Date("2010-07-16"),
    genre: ["Sci-Fi, Action, Adventure"],
  },
  {
    id: 2,
    title: "The Dark Knight",
    duration: 152,
    director: "Christopher Nolan",
    actors: ["Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine"],
    producedBy: "Warner Bros.",
    releaseDate: new Date("2008-07-18"),
    genre: ["Action, Crime, Drama"],
  },
  {
    id: 3,
    title: "Sniper",
    duration: 98,
    director: "Luis Llosa",
    actors: ["Tom Berenger, Billy Zane, J.T. Walsh, Aden Young"],
    producedBy: "TriStar Pictures",
    releaseDate: new Date("1993-01-29"),
    genre: ["Action, Thriller, War"],
  },
  {
    id: 4,
    title: "Planet of the Apes",
    duration: 121,
    director: "Tim Burton",
    actors: [
      "Mark Wahlberg, Helena Bonham Carter, Tim Roth, Michael Clarke Duncan",
    ],
    producedBy: "20th Century Fox",
    releaseDate: new Date("2001-07-27"),
    genre: ["Sci-Fi, Action, Adventure"],
  },
];
