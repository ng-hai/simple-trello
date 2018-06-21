import React from 'react'

import { Heading, Paragraph, Button, Paper } from '../atoms'
import { CUSTOM_GRAY } from '../theme'

const Home = () => {
  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <div
          style={{
            width: 350,
            height: 500,
            padding: 8,
            background: CUSTOM_GRAY,
            overflowY: 'auto',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
            <Paper key={value} style={{ marginBottom: 8 }}>
              <Paragraph>
                Why is your design system built from scratch instead of using an
                existing library?
              </Paragraph>
            </Paper>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
