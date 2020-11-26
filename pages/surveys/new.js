import { useState, useContext } from 'react';
import { Context as SurveyContext } from '../../context/surveyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import requireAuth from '../../helpers/requireAuth';
import validateEmails from '../../helpers/validateEmails';

function InfoOverlay({ text }) {
  return (
    <div className="absolute top-1 pt-2 w-screen max-w-xs left-0 -ml-20">
      <div className="bg-white border shadow-md p-4 rounded-md">{text}</div>
    </div>
  );
}

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
    } else if (!validateEmails(recipients)) {
      setError('Recipient email list has one or many invalid values');
    } else {
      router.push('/surveys/review');
    }
  };

  const getInfoIcon = (input) => {
    return (
      <FontAwesomeIcon
        icon="info-circle"
        className="cursor-pointer"
        onMouseEnter={() => setShowInfo(input)}
        onMouseLeave={() => setShowInfo('')}
      />
    );
  };

  return (
    <div className="flex justify-center">
      <div className="flex-1 max-w-md">
        <h1 className="text-3xl font-bold">Create new survey</h1>
        <form onSubmit={onSubmit}>
          <div className="pt-6">
            <label className="block pb-1" htmlFor="title">
              Campaign Title
              <span className="relative ml-2">
                {getInfoIcon('title')}
                {showInfo === 'title' && (
                  <InfoOverlay text="Recipients cannot see the campaign title on their email. You can write something meaningful here." />
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
              <span className="relative ml-2">
                {getInfoIcon('body')}
                {showInfo === 'body' && (
                  <InfoOverlay text="The text that appears on the email. Body should end with an yes/no question. Answer buttons will be appended automatically." />
                )}
              </span>
            </label>
            <textarea
              className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
              name="subject"
              rows={6}
              cols={40}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="pt-6">
            <label className="block pb-1" htmlFor="subject">
              Recipient List
              <span className="relative ml-2">
                {getInfoIcon('recipients')}
                {showInfo === 'recipients' && (
                  <InfoOverlay text="Comma separated email addresses of recipients." />
                )}
              </span>
            </label>
            <input
              className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
              type="text"
              name="subject"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="johndoe@gmail.com,janesmith@aol.com"
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
