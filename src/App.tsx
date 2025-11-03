import { ItemWithDotScroll } from './components/ItemWithDotScroll';

const App = () => {
  return (
    <>
      <div className='container'>
        <ItemWithDotScroll id={19213} />
        {[...Array(100)].map((_, idx) => (
          <ItemWithDotScroll key={idx} id={idx + 1} />
        ))}
      </div>
    </>
  );
};

export default App;
