import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import withNextApollo from '../lib/with-next-apollo';

function UserList (props) {
  const { data } = props;

  const isLoading = !data || data.loading;
  if (isLoading) {
    return 'Loading...';
  }

  const { error, allUsers } = data;
  if (error) return <ErrorMessage message='Error loading posts.' />
  if (allUsers && allUsers.length) {
    return (
      <section>
        <h2>Users</h2>
        <ul>
          {allUsers.map((user, index) => (
            <li key={user.id}>
              <div>
                <span>{index + 1}. {user.firstName}</span>
              </div>
            </li>
          ))}
        </ul>
        <style jsx>{`
          section {
            padding-bottom: 20px;
          }
          li {
            display: block;
            margin-bottom: 10px;
          }
          div {
            align-items: center;
            display: flex;
          }
          a {
            font-size: 14px;
            margin-right: 10px;
            text-decoration: none;
            padding-bottom: 0;
            border: 0;
          }
          span {
            font-size: 14px;
            margin-right: 5px;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          button:before {
            align-self: center;
            border-style: solid;
            border-width: 6px 4px 0 4px;
            border-color: #ffffff transparent transparent transparent;
            content: '';
            height: 0;
            margin-right: 5px;
            width: 0;
          }
        `}</style>
      </section>
    )
  }
}

export const allUsers = gql`
  query allUsers {
    allUsers(orderBy: createdAt_DESC, first: 100) {
      id
      firstName
    }
  }
`;

export default withNextApollo(
  graphql(allUsers, {
    skip: ({ isInitialProps }) => {
      return isInitialProps === true;
    }
  })(UserList)
);
