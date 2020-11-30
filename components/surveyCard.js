import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';
import buildApiClient from '../helpers/buildApiClient';
import Modal from './modal';
import SurveyCardChart from './surveyCardChart';

export default function SurveyCard({ survey, sessionToken }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    title,
    dateSent,
    yes,
    no,
    subject,
    body,
    recipientsAmount,
    id,
  } = survey;
  const router = useRouter();

  const openModal = () => setShowDeleteModal(true);
  const closeModal = () => setShowDeleteModal(false);
  const modalTitle = `Delete survey ${title}`;
  const modalBody = `Are you sure you want to delete survey ${title}? It will be permanently removed.`;
  const modalButtonText = 'Delete';

  const deleteSurvey = async () => {
    const client = buildApiClient(sessionToken);
    await client.delete(`/api/surveys/${id}`);
    closeModal();
    router.push('/surveys/overview');
  };

  const votesAmount = yes + no;
  const hasVotes = votesAmount > 0;

  return (
    <article
      //style={{ minWidth: '400px' }}
      className="flex flex-col bg-white shadow-md rounded-lg border border-gray-400 mb-8 md:mb-6 md:mx-3"
    >
      <header className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-lg font-bold pr-4">{title}</h1>
        <span className="text-xs">{new Date(dateSent).toDateString()}</span>
      </header>
      <div className="flex-1 p-2 md:p-6 flex justify-center">
        <div className="flex flex-col">
          <fieldset className="border px-4 py-2 mb-6">
            <legend className="text-sm font-medium">Recipients</legend>
            <div className="flex justify-evenly">
              <p>Amount: {recipientsAmount}</p>
              <p>
                Responded: {votesAmount} (
                {(votesAmount / recipientsAmount) * 100}%)
              </p>
            </div>
          </fieldset>
          <fieldset className="border px-2 md:px-4 py-2 mb-6">
            <legend className="text-sm font-medium">Email subject line</legend>
            <p>{subject}</p>
          </fieldset>
          <fieldset className="border px-2 md:px-4 py-2">
            <legend className="text-sm font-medium">Email body</legend>
            <p>{body}</p>
          </fieldset>
          <div className="pt-6 flex">
            <SurveyCardChart hasVotes={hasVotes} yes={yes} no={no} />
            <div className="flex-1 flex flex-col justify-center items-start">
              <p className="font-bold pl-4 py-1">
                <FontAwesomeIcon
                  icon="circle"
                  color="#0197F6"
                  className="mr-1"
                />{' '}
                Yes: {yes}
              </p>
              <p className="font-bold pl-4 py-1">
                <FontAwesomeIcon
                  icon="circle"
                  color="#D7263D"
                  className="mr-1"
                />{' '}
                No: {no}
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-end text-xl pt-2">
            <button
              onClick={openModal}
              className="text-red-500 hover:text-red-600 active:text-red-700 focus:text-red-600 focus:outline-none"
            >
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={showDeleteModal}
        close={closeModal}
        title={modalTitle}
        body={modalBody}
        btnText={modalButtonText}
        submit={deleteSurvey}
      />
    </article>
  );
}
