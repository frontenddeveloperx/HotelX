import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser as setUserAction } from '../features/users/usersSlice';
import { setHotelOwner as setHotelOwnerAction } from '../features/hotelOwners/hotelOwnerSlice';

export const useIdentity = (identity) => {
  const [typeOfUser, setTypeOfUser] = useState(identity);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [hotelOwner, setHotelOwner] = useState(
    localStorage.getItem('hotelOwner')
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (identity === 'user') {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
        dispatch(setUserAction());
      }
    } else if (identity === 'hotelOwner') {
      const hotelOwner = localStorage.getItem('hotelOwner');
      if (!hotelOwner) {
        navigate('/hotel-owner-login');
      } else {
        setHotelOwner(hotelOwner);
        dispatch(setHotelOwnerAction());
      }
    }
  }, [typeOfUser]);

  return {
    user: user ? JSON.parse(user) : null,
    hotelOwner: hotelOwner ? JSON.parse(hotelOwner) : null,
  };
};
