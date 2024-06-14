type Movie = {
	id: number;
	title: string;
	duration: number; // Diperbaiki menjadi number
	director: string;
	actors: string;
	producedBy: string;
	releaseDate: string;
	genre: string;
  };
  
  export const dataMovies: Movie[] = [
	{
	  id: 1,
	  title: "Inception",
	  duration: 148,
	  director: "Christopher Nolan",
	  actors: "Leonardo DiCaprio",
	  producedBy: "Warner Bros.",
	  releaseDate: "2010-07-16",
	  genre: "Sci-Fi"
	},
	{
	  id: 2,
	  title: "The Dark Knight",
	  duration: 152,
	  director: "Christopher Nolan",
	  actors: "Christian Bale",
	  producedBy: "Warner Bros.",
	  releaseDate: "2008-07-18",
	  genre: "Action"
	},
	{
	  id: 3,
	  title: "Sniper",
	  duration: 98,
	  director: "Luis Llosa",
	  actors: "Tom Berenger",
	  producedBy: "TriStar Pictures",
	  releaseDate: "1993-01-29",
	  genre: "Action"
	},
	{
	  id: 4,
	  title: "Planet of the Apes ",
	  duration: 121,
	  director: "Tim Burton",
	  actors: "Mark Wahlberg",
	  producedBy: "20th Century Fox",
	  releaseDate: "2001-07-27",
	  genre: "Sci-Fi"
	}
  ];

