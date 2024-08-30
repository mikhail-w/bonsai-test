import { helix } from 'ldrs';

helix.register();

function Loader() {
  return (
    <div className="loader">
      <l-helix size="45" speed="2.5" color="green"></l-helix>
    </div>
  );
}

export default Loader;
