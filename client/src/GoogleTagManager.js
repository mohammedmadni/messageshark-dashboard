import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-PLZ0WBGKN6');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
