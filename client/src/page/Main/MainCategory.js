import React, { useState } from "react";
import styled from "styled-components";

export default function MainCategory() {
  const [clickCategory, setClickCategory] = useState(false);
  return <CategoryContainer></CategoryContainer>;
}

const CategoryContainer = styled.div`
  border: 1px solid black;
`;
