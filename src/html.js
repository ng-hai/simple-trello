import React from 'react'
import { object, array, string } from 'prop-types'

export default class HTML extends React.Component {
  static propTypes = {
    htmlAttributes: object,
    headComponents: array,
    bodyAttributes: object,
    preBodyComponents: array,
    body: string,
    postBodyComponents: array,
  }

  render () {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <title>Simple Trello</title>
          <meta
            name='description'
            content='A simple cloning version of Trello, using React ecosystem.'
          />
          <meta name='apple-mobile-web-app-title' content='Simple Trello' />
          <meta name='application-name' content='Simple Trello' />
          <meta name='msapplication-TileColor' content='#20242a' />
          <meta name='theme-color' content='#20242a' />

          <meta
            property='og:image'
            content='https://simple-trello.netlify.com/og-image.jpg'
          />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='600' />
          <meta property='og:image:type' content='image/jpeg' />
          <meta property='og:title' content='Simple Trello' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://simple-trello.netlify.com' />
          <meta
            property='og:description'
            content='A simple cloning version of Trello, using React ecosystem.'
          />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:title' content='Simple Trello' />
          <meta
            name='twitter:description'
            content='A simple cloning version of Trello, using React ecosystem.'
          />
          <meta
            name='twitter:image'
            content='https://simple-trello.netlify.com/og-image.jpg'
          />

          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#55dbf8' />
          <link
            rel='preconnect'
            href='https://fonts.googleapis.com/'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700&amp;subset=vietnamese'
            rel='stylesheet'
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id='___gatsby'
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
