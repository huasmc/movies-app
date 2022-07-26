import React, { useState } from "react";

import { InputField, Button } from "shared/components";
import { Movie, MoviesAction } from "types";

interface AddMovieFormProps {
  onSubmit: (
    data: Record<"imageUrl" | "title" | "subtitle" | "description", string>
  ) => void;
  onCancel: () => void;
}

export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  // TODO: Implement form for adding a movie
  const [newMovie, setNewMovie] = useState<any | Movie | null>(null);

  return (
    <form className="p-4 ">
      {/* TODO: Add code to make form actions work */}
      <InputField
        name="Url"
        setter={(value) => setNewMovie({ ...newMovie, imageUrl: value })}
      />
      <InputField
        name="Title"
        setter={(value) => setNewMovie({ ...newMovie, title: value })}
      />
      <InputField
        name="Subtitle"
        setter={(value) => setNewMovie({ ...newMovie, subtitle: value })}
      />
      <InputField
        name="Description"
        setter={(value) => setNewMovie({ ...newMovie, description: value })}
      />
      <div className="text-center">
        <Button onClick={() => onSubmit(newMovie)}>Submit</Button>
        <Button onClick={() => onCancel()}>Cancel</Button>
      </div>
    </form>
  );
}
