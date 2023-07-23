import { useState } from "react";

function useHighlight() {
  const [highligh, setHighligh] = useState(true);
  return { highligh, toggleHighlight: () => setHighligh((prev) => !prev) };
}

export default useHighlight;
