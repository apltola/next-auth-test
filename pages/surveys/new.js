import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import buildApiClient from '../../helpers/buildApiClient';
import requireAuth from '../../helpers/requireAuth';
import extractSessionToken from '../../helpers/extractSessionToken';

function NewSurveyPage(props) {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState('');
  const [showInfo, setShowInfo] = useState('');

  const ping = async () => {
    const client = buildApiClient(props.token);
    const res = await client.post('/api/dummy');
    console.log(res.data);
  };
  console.log(props);

  return (
    <div className="flex justify-center">
      <div className="flex-1 max-w-md">
        <button onClick={ping}>ping api</button>
        <h1 className="text-3xl font-bold">Create new survey</h1>
        <form>
          <div className="pt-6">
            <label className="block pb-1" htmlFor="title">
              Survey Title
              <span className="relative ml-2">
                <FontAwesomeIcon
                  icon="info-circle"
                  className="cursor-pointer"
                  onMouseEnter={() => setShowInfo('title')}
                  onMouseLeave={() => setShowInfo('')}
                />
                {showInfo === 'title' && (
                  <div className="absolute top-1 pt-2 transform w-screen max-w-xs sm:left-1 md:left-0">
                    <div className="bg-white border shadow-md p-4 rounded-md">
                      Recipients cannot see the survey title on their email. You
                      can write something meaningful here.
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
              Email Subject
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
              Recipients
            </label>
            <input
              className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
              type="text"
              name="subject"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  requireAuth(ctx);
  const token = extractSessionToken(ctx);

  return {
    props: {
      token,
    },
  };
}

export default NewSurveyPage;
