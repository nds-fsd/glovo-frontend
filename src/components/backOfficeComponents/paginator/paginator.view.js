/* eslint-disable no-debugger */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './paginator.module.css';

export const Paginator = ({ currentPage, totalPages, setCurrentPage }) => {
  const handleDoubleLeft = () => {
    if (currentPage === 1) {
      return null;
    }
    return setCurrentPage(1);
  };
  const handleLeft = () => {
    if (currentPage === 1) {
      return null;
    }
    return setCurrentPage(currentPage - 1);
  };
  const handleRight = () => {
    if (currentPage === totalPages) {
      return null;
    }
    return setCurrentPage(currentPage + 1);
  };
  const handleDoubleRight = () => {
    if (currentPage === totalPages) {
      return null;
    }
    return setCurrentPage(totalPages);
  };
  return (
    <div className={styles.container}>
      {currentPage !== 1 && (
        <>
          <FontAwesomeIcon icon="angle-double-left" onClick={() => handleDoubleLeft()} />
          <FontAwesomeIcon icon="angle-left" onClick={() => handleLeft()} />
        </>
      )}
      <p>
        Page {currentPage} of {totalPages} pages{' '}
      </p>
      {currentPage !== totalPages && (
        <>
          <FontAwesomeIcon icon="angle-right" onClick={() => handleRight()} />
          <FontAwesomeIcon icon="angle-double-right" onClick={() => handleDoubleRight()} />
        </>
      )}
    </div>
  );
};
