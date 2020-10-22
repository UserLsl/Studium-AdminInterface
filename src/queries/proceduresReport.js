import gql from 'graphql-tag';

const GET_REPORTS = gql`
{ 
    reports {
        id
        postId
        commentId
        userId
        reportTitle
        reportBody
        solved
    }
}
`;

const UPDATE_REPORTS = gql`
mutation updateReport($id: String, $solved: Boolean) {
    updateReport(_id: $id, solved: $solved) {
        id,
        solved
    }
}
`;

export {GET_REPORTS, UPDATE_REPORTS};