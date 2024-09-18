
export const fetchCars = async (page, perPage) => {
  try {
    const response = await fetch(`https://api.caiman-app.de/api/cars-test?page=${page}&per_page=${perPage}`);
    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка:', error);
    return null;
  }
};
