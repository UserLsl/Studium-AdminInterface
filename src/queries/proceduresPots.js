import gql from 'graphql-tag';

const GET_POSTS = gql`
{
    posts (
      pageSize: 1000,
      # after: "2"
    ) {
      hasMore
      cursor
      posts {
        id
        author
        postTitle
        postBody
        cursor
        postImageURL
        createdAt
        categoryId
        postTags
      }
    }
  }
`;

const DELETE_POST = gql`
mutation deletePost($id: String) {
    deletePost(_id: $id) {
        id
    }
}
`;

export {GET_POSTS, DELETE_POST};