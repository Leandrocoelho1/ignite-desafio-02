import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { api } from '../services/api';
import { Button } from './Button'
import {GenreResponseProps} from '../App'

import '../styles/sidebar.scss';

interface SideBarProps {
  selectedGenreId: number;
  updateSelectedGenreId: Dispatch<SetStateAction<number>>
}


export function SideBar({selectedGenreId, updateSelectedGenreId}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    updateSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}