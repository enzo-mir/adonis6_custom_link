import styled from 'styled-components'

const DashboardSection = styled.section`
  position: relative;
  display: grid;
  place-items: center;
  transition: all 1s ease-out;
  background-color: ${(provider) => provider.theme.body};
  box-shadow: 0 20px 20px 0px rgba(0, 0, 0, 0.3);
  width: clamp(300px, 40svw, 500px);
  height: 40svh;

  & article {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    width: clamp(300px, 40svw, 500px);
    height: 100%;
    max-height: 40svh;
    padding: 1em;
    background-color: ${(provider) => provider.theme.body};
  }
  h1,
  h2 {
    color: ${(provider) => provider.theme.header_color};
    text-align: center;
  }
  h1 {
    font-size: 2.5em;
  }
  h2 {
    font-weight: 400;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    width: 100%;
    max-width: 500px;
    padding-block: 2em;
  }
  li {
    list-style-type: none;
    width: 100%;
  }

  a {
    display: flex;
    background-color: ${(provider) => provider.theme.bg_links};
    color: ${(provider) => provider.theme.text};
    border-radius: ${(provider) => provider.theme.border_radius};
    text-decoration: none;
    width: 100%;
    padding: 0.5em;
  }

  & button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: ${(provider) => provider.theme.body};
    opacity: 0.5;
    padding: 0.5em;
    border: none;
    border-radius: 5px;
    transition: filter 0.5s ease-out;
    backdrop-filter: blur(10px);

    &:hover,
    &:focus-visible {
      cursor: pointer;
      filter: brightness(75%);
      opacity: 1;
    }
  }

  &.preview {
    width: 100%;
    height: 100svh;
  }
`

const DashboardMain = styled.main`
  height: 100%;
  display: grid;
  place-items: center;
`

export { DashboardSection, DashboardMain }