import React, { useState, useEffect } from 'react';
import './App.css';
import 'lazysizes';
import { ToastContainer, toast } from 'react-toastify';
import LoaderSpinner from './components/Loader';
import Seachbar from './components/Searchbar';
import Button from './components/Button';
import fetchGallery from './services/gallery-service';
import ImageGallery from './components/ImageGallery';
import Section from './components/Section';
import Modal from './components/Modal';
import DefaultEmptyField from './components/DefaultEmpyField';
import authContext from './components/Context';

interface Image {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  previewURL: string;
}

type OptionType = {
  top: undefined | number;
  behavior: 'smooth' | 'auto' | undefined;
};

const App = () => {
  const [gallery, setGallery] = useState<Image[] | []>([]);
  const [currentPage, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedImgURL, setSelectedImgURL] = useState('');
  const [isModalOpen, setModal] = useState(false);
  const [selectedLowQImgUrl, setSelectedLowQImgUrl] = useState('');

  useEffect(() => {
    if (!search) {
      return;
    }

    setLoading(true);
    fetchGallery(search, currentPage)
      .then(images => {
        setGallery(state => [...state, ...images]);
      })
      .catch(error => toast(error))
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, search]);

  function onLoadMoreBtnClick() {
    setPage(state => state + 1);
    const options: OptionType = {
      top: undefined,
      behavior: 'smooth',
    };

    options.top =
      window.pageYOffset + document.documentElement.clientHeight - 150;
    setTimeout(() => {
      window.scrollTo(options);
    }, 1000);
  }

  const handleSubmit = (query: string): void => {
    if (query !== search) {
      setGallery([]);
      setSearch(query);
      setPage(1);
    }

    if (!query) {
      const notify = () =>
        toast.info('🚀 Search field is empty!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      notify();

      return;
    }
  };

  const hadleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    if (e.currentTarget.nodeName !== 'IMG') {
      return;
    }

    e.preventDefault();

    const fullImgLink = e.currentTarget.getAttribute('data-large') as string;
    const lowSrc = e.currentTarget.getAttribute('src') as string;

    setSelectedImgURL(fullImgLink);
    setSelectedLowQImgUrl(lowSrc);
    setModal(true);
  };

  const toggleModal = (): void => {
    setModal(!isModalOpen);

    if (isModalOpen) {
      document.body.style.overflowY = 'hidden';
    }
  };

  return (
    <>
      <Seachbar onSubmit={handleSubmit} />

      {gallery.length === 0 && <DefaultEmptyField />}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        draggablePercent={60}
      />

      {isLoading && (
        <Section>
          <LoaderSpinner />
        </Section>
      )}

      <authContext.Provider value={hadleImageClick}>
        {search && <ImageGallery gallery={gallery} />}
      </authContext.Provider>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img
            src={selectedLowQImgUrl}
            data-src={selectedImgURL}
            alt="fullsizeImage"
            className="lazyload blur-up modal-img"
          ></img>
        </Modal>
      )}
      {search && gallery.length > 11 && (
        <Section>
          <Button onClick={onLoadMoreBtnClick} />
        </Section>
      )}
    </>
  );
};

export default App;
