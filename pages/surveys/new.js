import { useState, useContext } from 'react';
import { Context as SurveyContext } from '../../context/surveyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import requireAuth from '../../helpers/requireAuth';

function NewSurveyPage() {
  const { state, setSurveyData } = useContext(SurveyContext);
  const [title, setTitle] = useState(state.title);
  const [subject, setSubject] = useState(state.subject);
  const [body, setBody] = useState(state.body);
  const [recipients, setRecipients] = useState(state.recipients);
  const [showInfo, setShowInfo] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const hasEmptyField = () => {
    return !title || !subject || !body || !recipients;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = {
      title,
      subject,
      body,
      recipients,
    };
    setSurveyData(data);

    if (hasEmptyField()) {
      setError('All fields must be filled');
    } else {
      router.push('/surveys/review');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex-1 max-w-md">
        {/* <button onClick={ping}>ping api</button> */}
        <h1 className="text-3xl font-bold">Create new survey</h1>
        <form onSubmit={onSubmit}>
          <div className="pt-6">
            <label className="block pb-1" htmlFor="title">
              Campaign Title
              <span className="relative ml-2">
                <FontAwesomeIcon
                  icon="info-circle"
                  className="cursor-pointer"
                  onMouseEnter={() => setShowInfo('title')}
                  onMouseLeave={() => setShowInfo('')}
                />
                {showInfo === 'title' && (
                  <div className="absolute top-1 pt-2 transform w-screen max-w-xs left-1">
                    <div className="bg-white border shadow-md p-4 rounded-md">
                      Recipients cannot see the title on their email. You can
                      write something meaningful here.
                    </div>
                  </div>
                )}
              </span>
            </label>
            <input
              className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="pt-6">
            <label className="block pb-1" htmlFor="subject">
              Email Subject Line
            </label>
            <input
              className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="pt-6">
            <label className="block pb-1" htmlFor="subject">
              Email Body
            </label>
            <textarea
              className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
              name="subject"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="pt-6">
            <label className="block pb-1" htmlFor="subject">
              Recipient List
            </label>
            <input
              className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
              type="text"
              name="subject"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
          </div>
          <div className="pt-6">
            <button type="submit">Next &rarr;</button>
          </div>
          {error && (
            <div className="pt-6 text-red-500 text-center">
              <FontAwesomeIcon icon="exclamation-circle" className="mr-2" />
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  requireAuth(ctx);
  return { props: {} };
}

export default NewSurveyPage;
