import gql from 'graphql-tag';

const GET_USERS = gql`
{
    users {
      id
      nickname
      username
      userExp
      userLevel
      userPermission
      userRanking
      userPosts
      userComments
      userReports
    }
}
`

export default GET_USERS;