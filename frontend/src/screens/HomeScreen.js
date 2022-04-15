import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocationToLocalStorage } from '../features/userLocation/userLocationSlice';
import { getHotels, getNearbyHotels } from '../features/hotel/hotelSlice';
import { HotelCard } from '../components/HotelCard';
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { hotels, nearbyHotels } = useSelector((state) => state.hotel);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        dispatch(
          addLocationToLocalStorage({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
        dispatch(
          getNearbyHotels({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getHotels());
  }, []);

  return (
    <>
      <h1>Nearby hotels (within 100km)</h1>
      <Row>
        {nearbyHotels.map((hotel) => {
          return (
            <Col key={hotel._id} xs={11} sm={6} md={6} lg={6} xl={4}>
              <HotelCard hotel={hotel} />
            </Col>
          );
        })}
      </Row>

      <h1>All hotels</h1>
      <Row>
        {hotels.map((hotel) => {
          return (
            <Col key={hotel._id} xs={11} sm={6} md={6} lg={6} xl={4}>
              <HotelCard hotel={hotel} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
