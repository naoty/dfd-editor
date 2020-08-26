import React, { ReactElement } from "react";

export default function Index(): ReactElement {
  const handleSubmit = event => {
    console.log(event);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" />
    </form>
  );
}
