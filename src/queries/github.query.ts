import gql from "graphql-tag";

export default gql`
  query ($pinnedRepos: Int!, $otherRepos: Int!, $page: String!) {
    viewer {
      avatarUrl
      email
      name
      url
      websiteUrl
      pinnedItems(first: $pinnedRepos, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            description
            homepageUrl
            name
            url
            openGraphImageUrl
            repositoryTopics(first: 4) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
      pinnableItems(first: $otherRepos, after: $page) {
        nodes {
          ... on Repository {
            id
            description
            homepageUrl
            name
            url
            openGraphImageUrl
            repositoryTopics(first: 4) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
        pageInfo {
          startCursor
          hasPreviousPage
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
