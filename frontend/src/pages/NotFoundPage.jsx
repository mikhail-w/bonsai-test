import notFound from '../assets/images/404.svg';
import BackButton from '../components/BackButton';

function NotFoundPage() {
  return (
    <>
      <BackButton />
      <div className="notFoundContainer">
        <img src={notFound}></img>
        <div className="notFoundTitle">Page not found!</div>
      </div>
      <div className="notFoundSub">Sorry, this page is not available...</div>
    </>
  );
}

export default NotFoundPage;
