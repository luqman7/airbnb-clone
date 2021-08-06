import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import Router from 'next/router'; //make conn to router

import ProgressBar from '@badrap/bar-of-progress';

const progress = new ProgressBar({
  size: 4, //thick of bar
  color: '#FE595E',
  className: 'z-50', // z is how its layers up, make it always at top
  delay: 100, // site is super fast, delay is to show the bar
});

//when the user go to new page, the progress bar should start
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
