// const initializeChatClient = async () => {
//   try {
//     // Call your backend API to get a Stream.io token
//     const response = await fetch('/api/auth/create-token', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ userId: 'example-user-id' }) // Replace with the actual user ID
//     });

//     const data = await response.json();

//     if (response.ok) {
//       // Check if API key exists
//       const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//       if (!apiKey) {
//         throw new Error('Stream API key is not defined');
//       }

//       // Initialize the Stream.io client using the API key
//       const client = StreamChat.getInstance(apiKey);

//       // Connect the user to the Stream.io client with the token
//       await client.connectUser(
//         { id: 'example-user-id', name: 'User Name' }, // Replace with dynamic user details
//         data.token
//       );

//       // Save the client instance in the state
//       setChatClient(client);
//     } else {
//       console.error('Error initializing chat client:', data.error);
//     }
//   } catch (error) {
//     console.error('Error initializing chat client:', error);
//   }
// };


import React from 'react'

const CollaborativePage = () => {
  return (
    <div>
      collab page here
    </div>
  )
}

export default CollaborativePage
