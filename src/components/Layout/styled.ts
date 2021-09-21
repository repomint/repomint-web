import styled from "styled-components/macro";

export const Main = styled.main`
  display: flex;
  background-color: ${(props) => props.theme.colors.darkerGray};
  height: 100%;
  padding-top: ${(props) => props.theme.spacing.md};
`;

export const MainContent = styled.div`
  width: auto;
  max-width: ${(props) => props.theme.width.main};
  background-color: ${(props) => props.theme.colors.gray};
  height: 100%;
  margin: 0 auto;
  border-radius: ${(props) => props.theme.border["10px"]}
    ${(props) => props.theme.border["10px"]} 0 0;
  flex-grow: 1;
`;
