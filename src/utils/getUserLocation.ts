const getLocation = async (): Promise<GeolocationCoordinates | null> => (
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      resolve(null);
    }
  })
);

export default getLocation;
