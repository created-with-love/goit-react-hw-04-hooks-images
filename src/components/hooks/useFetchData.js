import { useEffect, useState } from 'react';
import fetchGallery from '../../services/gallery-service';
import { toast } from 'react-toastify';

export default function useFetchData(
  currentPage,
  setGallery,
  setPage,
  setLoading,
) {
  const [state, setState] = useState('');

  useEffect(() => {
    if (state) {
      setLoading(true);

      fetchGallery(state, currentPage)
        .then(images => {
          setGallery(state => [...state, ...images]);
          setPage(state => state + 1);
        })
        .catch(error => toast(error))
        .finally(() => {
          onLoadMoreBtnClick();
          setLoading(false);
        });
    }

    function onLoadMoreBtnClick() {
      if (currentPage > 2) {
        const options = {
          top: null,
          behavior: 'smooth',
        };

        options.top =
          window.pageYOffset + document.documentElement.clientHeight;
        setTimeout(() => {
          window.scrollTo(options);
        }, 1000);
      }
    }
  }, [state]);

  return [state, setState];
}
