import styles from '../styles/landing.module.css';

export default function Landing() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div
        className={`${styles.heroLeft} flex-1 flex items-center justify-center`}
      >
        <div className="text-gray-900 pl-0 lg:pl-4">
          <h1 className="text-4xl md:text-5xl tracking-tight font-extrabold pb-10 lg:pb-0">
            <span className="block">Collect data with</span>
            <span className="block text-ultramarine-2">yes-no questions</span>
          </h1>
          {/* <div className="text-lg">jeejejealskdjfasölkdfj</div> */}
        </div>
      </div>
      <div className="flex-0 text-right">
        <img
          src="/email.svg"
          alt="email vector"
          style={{ width: '100%', maxWidth: '1000px' }}
        />
      </div>
    </div>
  );
}
