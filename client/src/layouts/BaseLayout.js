import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const BasePage = styled.div``;

const LayoutBasePage = ({ children }) => {
  return <BasePage id="body">{children}</BasePage>;
};

export default LayoutBasePage;
