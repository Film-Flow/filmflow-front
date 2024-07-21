'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

type FriendRequest = {
  senderId: string;
  randomId: number;
}

const socket = io('http://localhost:3000'); // Crie o socket fora do componente para garantir uma única instância

export default function Profile({ params }: { params: { id: string } }) {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    socket.emit('register', { userId: params.id }); // Emita um evento para registrar o usuário com o backend

    const handleFriendRequest = (payload: FriendRequest) => {
      console.log('Friend request received:', payload);
      setFriendRequests(prevRequests => [...prevRequests, {
        ...payload,
        randomId: Math.random()
      }]);
    };

    socket.on('friendRequest', handleFriendRequest);

    return () => {
      socket.off('friendRequest', handleFriendRequest); // Remova o ouvinte ao desmontar o componente
    };
  }, [params.id]); // Adicione params.id ao array de dependências para garantir que o socket seja atualizado

  return (
    <>
      <h1>Friend Requests</h1>
      {friendRequests.map(request => (
        <p key={request.randomId}>Request from {request.senderId}</p>
      ))}
    </>
  );
}
