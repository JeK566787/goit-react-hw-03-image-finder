import axios from 'axios';

export const fetchImages = async (query, page) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '31582938-c9e43ffb2e6f46798ceb70690',
      q: query,
      page: page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return data;
};
