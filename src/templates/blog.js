import React from 'react'
import { graphql } from 'gatsby'

// eslint-disable-next-line
export default ({ data }) => {
  const post = data.markdownRemark
  return <div dangerouslySetInnerHTML={{ __html: post.html }} />
}

export const query = graphql`
  query BlogPostQuery($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`
