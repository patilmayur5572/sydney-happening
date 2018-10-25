/**
 * replace the URL with the domain url when deploying for production
 * For example, if deploying to http://sydneyhappening.abc.com
 * then the domainURL would be http://sydneyhappenig.abc.com
 * The server would map the APIs from that url. 
 */
export const environment = {
  production: true,
  name: '',
  domainURL: 'http://localhost:3000'
};
