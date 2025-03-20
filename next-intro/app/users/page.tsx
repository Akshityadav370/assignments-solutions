import axios from 'axios';

async function getUserDetails() {
  const response = await axios.get('http://localhost:3000/api/v1/user/details');
  return response.data;
}

export default async function Users() {
  const userData = await getUserDetails();

  return (
    <div>
      {userData.email}
      {userData.name}
    </div>
  );
}
