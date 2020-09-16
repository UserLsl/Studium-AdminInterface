import gql from 'graphql-tag';

const GET_CATEGORIES = gql`
{ 
    categories {
        id
        categoryPosts
        categoryTitle
    }
}
`;

const INSERT_CATEGORY = gql`
mutation addCategory($categoryTitle: String) {
    addCategory(categoryTitle: $categoryTitle) {
        id,
        categoryTitle
    }
}
`;

const UPDATE_CATEGORY = gql`
mutation updateCategory($id: String, $categoryTitle: String) {
    updateCategory(_id: $id, categoryTitle: $categoryTitle) {
        id,
        categoryTitle
    }
}
`;

const DELETE_CATEGORY = gql`
mutation deleteCategory($id: String) {
    deleteCategory(_id: $id) {
        id
    }
}
`;

export {GET_CATEGORIES, INSERT_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY};